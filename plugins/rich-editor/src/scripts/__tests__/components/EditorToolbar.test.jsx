import React from "react";
import { mount, shallow } from "enzyme";
import EditorMenuItem from "../../components/EditorMenuItem";
import EditorToolbar from "../../components/EditorToolbar";
import Quill from "../../Quill";

jest.mock('quill/core');

test("matches snapshot", () => {
    const quill = new Quill();
    const toolbar = shallow(
        <EditorToolbar quill={quill}/>
    );

    expect(toolbar).toMatchSnapshot();
});

test("generates correct number of <EditorMenuItem /> components", () => {
    const menuItems = {
        foo: {},
        bar: {},
        other: {},
        thing: {},
    };
    const quill = new Quill();
    const toolbar = shallow(
        <EditorToolbar quill={quill} menuItems={menuItems}/>
    );

    expect(toolbar.find(EditorMenuItem).length).toBe(4);
});

test("can receive a custom formatter for the menu item click handler.", () => {
    const mockFormatter = jest.fn();

    const menuItems = {
        bold: {
            active: false,
            formatter: mockFormatter,
        },
    };
    const quill = new Quill();
    const toolbar = mount(
        <EditorToolbar quill={quill} menuItems={menuItems}/>
    );

    toolbar.find(".richEditor-button").simulate("click");
    toolbar.find(".richEditor-button").simulate("click");

    expect(mockFormatter.mock.calls.length).toBe(2);
});

describe("update", () => {
    const quill = new Quill();
    const mockGetFormat = jest.fn();
    mockGetFormat
        .mockReturnValueOnce({bold: true})
        .mockReturnValueOnce({});
    quill.getFormat = mockGetFormat;
    const menuItems = {
        bold: {
            active: false,
        },
    };

    const toolbar = shallow(
        <EditorToolbar quill={quill} menuItems={menuItems}/>
    );

    it("updates boolean type", () => {

        /** @var {EditorToolbar} */
        const instance = toolbar.instance();
        instance.update({});
        expect(toolbar.state("bold").active).toBe(true);
        instance.update({});
        expect(toolbar.state("bold").active).toBe(false);
    });
});
