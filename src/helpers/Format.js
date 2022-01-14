// REF: https://stackoverflow.com/a/822486/2106309
export const stripHtmlTag = (html) => {
    let tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
}

const formatHelpers = { stripHtmlTag }

export default formatHelpers