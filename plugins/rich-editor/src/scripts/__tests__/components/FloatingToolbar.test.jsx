import React from "react";
import { mount, shallow } from "enzyme";
import FloatingToolbar from "../../components/FloatingToolbar";
import Quill from "quill/core";

jest.mock("quill/core");

describe("<FloatingToolbar />", () => {
    const quill = new Quill();
    quill.options = {
        modules: {
            keyboard: {
                bindings: {},
            },
        },
    };
    quill.scroll = {
        descendants: jest.fn(() => []),
    };

    const toolbar = shallow(
        <FloatingToolbar quill={quill} forceVisibility={"visible"}>
            <div>Hello World</div>
        </FloatingToolbar>
    );

    /** @var {FloatingToolbar} */
    const instance = toolbar.instance();

    it("matches snapshot", () => {
        expect(toolbar).toMatchSnapshot();
    });
});
