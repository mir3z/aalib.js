import AbstractReporter from "./AbstractReporter";

export default class HtmlReporter extends AbstractReporter {
    constructor(root) {
        super();
        this.root = root;
        this.cache = createCache();

        this.$dom = {
            append: el => this.root.appendChild(el),
            replaceWith: (el, newNode) =>  el.parentNode.replaceChild(newNode, el)
        };
    }

    suiteStart({ currentTarget: suite }) {
        const benchmarks = suite.map(({ name }) => this.cache.set(name, $benchmark(name)));
        const el = $suite(benchmarks);
        this.$dom.append(el);
    }

    benchmarkStart({ target: { name } }) {
        const pending = this.cache.get(name);
        const running = $benchmark(name, { running: true });
        this.$dom.replaceWith(pending, running);
        this.cache.set(name, running);
    }

    benchmarkComplete({ target }) {
        const name = target.name;
        const running = this.cache.get(name);
        const complete = $benchmark(String(target), { complete: true });
        this.$dom.replaceWith(running, complete);
        this.cache.del(name);
    }
}

const $suite = (children) => {
    return $component(el => {
        el.classList.add("suite");
        children.forEach(child => el.appendChild(child));
    });
};

const $benchmark = (label, { running = false, complete = false } = {}) => {
    return $component(el => {
        el.classList.add("benchmark");
        running && el.classList.add("running", "spinner");
        complete && el.classList.add("complete");
        el.innerHTML = `<span class="name-wrapper">${ label }</span>`;
    });
};

const $component = (fn) => {
    const div = document.createElement("div");
    fn(div);
    return div;
};

function createCache() {
    const cache = {};

    return {
        set: (key, val) => cache[key] = val,
        get: key => cache[key],
        del: key => delete cache[key]
    };
}