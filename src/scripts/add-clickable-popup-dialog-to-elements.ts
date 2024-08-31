/**
 * Looks for the selector and adds a `<dialog>` with the contents. When the
 * original element is clicked, the dialog pops up.
 *
 * @param {string} selector CSS selector for querySelectorAll
 */
export const addClickablePopupDialogToElements = (selector: string = "img") => {
	const elements: HTMLElement[] = Array.from(
		document.querySelectorAll(selector),
	) as HTMLElement[];

	elements.forEach((element) => {
		const btn = document.createElement("button");
		btn.setAttribute("autofocus", "autofocus");
		btn.innerHTML = "Close";

		const clonedElement = element.cloneNode(true);

		const div = document.createElement("div");
		div.appendChild(clonedElement);
		div.appendChild(btn);

		const dialog = document.createElement("dialog");
		dialog.setAttribute("class", "dynamic-dialog");
		dialog.appendChild(div);

		dialog.addEventListener("click", () => {
			dialog.close();
		});

		clonedElement.addEventListener("click", (ev) => {
			ev.stopPropagation();
		});

		btn.addEventListener("click", () => {
			dialog.close();
		});

		element.addEventListener("click", () => {
			dialog.showModal();
		});

		element.after(dialog);
	});
};
