import aafont from "../../../src/aafont";


export default function benchmark({ test, run }) {
    test("aafont", () => {
        aafont(["#", "*", "."]);
    });

    run();
}

