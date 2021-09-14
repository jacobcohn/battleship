import logic from './logic';
import dom from './dom';
import events from './events';

(() => {
  logic.init();
  dom.init();
  events.init();
})();
