import React from "react";
import { mount, shallow } from "enzyme";
import InlineEditorToolbar from "../../components/InlineEditorToolbar";
import Quill from "quill/core";

jest.mock("quill/core");

describe("<InlineEditorToolbar />", () => {
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

    const toolbar = mount(
        <InlineEditorToolbar quill={quill}/>
    );

    /** @var {InlineEditorToolbar} */
    const instance = toolbar.instance();

    it("matches snapshot", () => {
        const shallowToolbar = shallow(
            <InlineEditorToolbar quill={quill}/>
        );
        expect(shallowToolbar).toMatchSnapshot();
    });

    it("can focus it's own input", () => {
        quill.getSelection = jest.fn().mockReturnValueOnce({index: 0, length: 3});
        instance.focusLinkInput();
        expect(instance.linkInput).toEqual(document.activeElement);
        const linkToolbar = toolbar.find(".richEditor-inlineMenu--Link").getDOMNode();
        expect(linkToolbar.style.visibility).toBe("visible");
    });
});
