
import { $$htmlToFragment } from '../runtime/base';
import { $watch } from '../runtime/cd';

export function $$htmlBlock($cd, tag, fn) {
    let lastElement;
    let create = (html) => {
        let fr = $$htmlToFragment(html);
        lastElement = fr.lastChild;
        tag.parentNode.insertBefore(fr, tag.nextSibling);
    };
    let destroy = () => {
        if(!lastElement) return;
        let next, el = tag.nextSibling;
        while(el) {
            next = el.nextSibling;
            el.remove();
            if(el == lastElement) break;
            el = next;
        }

        lastElement = null;
    };
    $watch($cd, fn, (html) => {
        destroy();
        if(html) create(html);
    }, {ro: true});
};
