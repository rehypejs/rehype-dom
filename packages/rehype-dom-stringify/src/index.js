import xtend from 'xtend';
import toDOM from 'hast-util-to-dom';

import { serializeNodeToHtmlString } from './utils';

export default function stringify(config) {
  const settings = xtend(config, this.data('settings'));

  if (settings.fragment == null) {
    settings.fragment = true;
  }

  function compiler(tree) {
    const node = toDOM(tree, settings);
    return serializeNodeToHtmlString(node);
  }

  this.Compiler = compiler;
}
