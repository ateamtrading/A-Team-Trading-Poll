function pollAndStore() {
  // 1) YouTube poll result (as before)
  const ytSignal = fetchResult(latestPollId());
  
  // 2) Web votes from PropertiesService
  const props = PropertiesService.getDocumentProperties();
  let counts = JSON.parse(props.getProperty('votes') || '{"BUY":0,"SELL":0}');
  // reset for next interval
  props.setProperty('votes', '{"BUY":0,"SELL":0}');

  // Combine totals
  const totalVotes = counts.BUY + counts.SELL;
  let finalSignal = 'NEUTRAL';
  if (totalVotes > 0) {
    const ratio = counts.BUY / totalVotes;
    if      (ratio > 0.5) finalSignal = 'BUY';
    else if (ratio < 0.5) finalSignal = 'SELL';
  }
  
  // (Optional) weight YouTube poll + web votes differently here
  PropertiesService.getDocumentProperties()
    .setProperty('lastSignal', finalSignal);
}
