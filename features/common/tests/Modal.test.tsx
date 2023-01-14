import { act, fireEvent, render, screen } from "@testing-library/react";
import Modal from "../components/UI/Modal";

describe("Modal", () => {
    describe("Show passed content", () => {
        const title = "Hello World";
        const placeholder = "example@domain.xyz";

        beforeEach(() => {
            render(
                <Modal title={title}>
                    <label>
                        Email
                        <input type="text" placeholder={placeholder} />
                    </label>
                </Modal>
            );
        });

        it("should show title", () => {
            screen.getByText(title);
        });

        it("should show content", () => {
            const input = screen.getByLabelText<HTMLInputElement>("Email");
            expect(input.placeholder).toEqual(placeholder);
        });
    });

    describe("closing trigger", () => {
        let closeHandler: () => void;
        beforeEach(() => {
            closeHandler = jest.fn();
            render(<Modal onClose={closeHandler}>Testing</Modal>);
        });

        it("should close", async () => {
            const backdrop = screen.getByTestId("backdrop");
            await act(() => fireEvent.click(backdrop));

            expect(closeHandler).toBeCalledTimes(1);
        });

        it("shouldn't close", () => {
            const modal = screen.getByTestId("main-modal");
            act(() => fireEvent.click(modal));
            expect(closeHandler).not.toBeCalled();
        });
    });
});

export {};
