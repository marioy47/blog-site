// src/scripts/copy-code-button.ts
/**
 * @module copyCodeButton
 */

/**
 * String or emoji to use for the copy button when is still not clicked.
 */
let _copyCodeIcon: string;
/**
 * String or emoji for the copy button when is clicked.
 */
let _copyCodeActivatedIcon: string;

/**
 * Requried style  of the button to be at the top-right of the code.
 */
const _cssPositionButton = `
position: var(--copy-code-position, absolute);
top: var(--copy-code-top, .3em);
right: var(--copy-code-right, .5em);
`;

/**
 * Should be called when the document loads or in the footer.
 * @param copyCodeIcon Icon or emoji to display when button is not clicked yet.
 * @param copyCodeActivatedIcon Icon or emoji to display when button is clicked.
 */
export function addCopyCodeButtons(
	copyCodeIcon: string,
	copyCodeActivatedIcon: string,
) {
	_copyCodeIcon = copyCodeIcon;
	_copyCodeActivatedIcon = copyCodeActivatedIcon;
	const codeBlocks = Array.from(document.querySelectorAll("pre"));

	for (const block of codeBlocks) {
		block.setAttribute("tabindex", "0");

		const copyButton = document.createElement("button");
		copyButton.innerText = _copyCodeIcon;
		copyButton.classList.add("copy-code");
		copyButton.setAttribute("style", _cssPositionButton);
		copyButton.setAttribute("title", "Copy code to clipboard");
		copyButton.addEventListener("click", async () => {
			await copyCode(block, copyButton);
		});
		block.appendChild(copyButton);

		const wrapper = document.createElement("div");
		wrapper.style.position = "relative";
		block.parentNode?.insertBefore(wrapper, block);
		wrapper.appendChild(block);
	}
}

/**
 * Gets called when the copy-code button is clicked.
 */
async function copyCode(
	codeBlock: HTMLPreElement,
	copyButton: HTMLButtonElement,
) {
	const textToCopy = codeBlock.innerText.replace(copyButton.innerText, "");

	await navigator.clipboard.writeText(textToCopy);
	copyButton.innerText = _copyCodeActivatedIcon;
	copyButton.classList.add("copy-code-clicked");

	setTimeout(() => {
		copyButton.innerText = _copyCodeIcon;
		copyButton.classList.remove("copy-code-clicked");
	}, 2000);
}
