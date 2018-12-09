export const filterArray = (arr, text) => (
    arr ?
        arr.filter(element => changeString(element.text)
            .includes(changeString(text))
        )
        : null
)

export const changeString = (string) => (
    string.toLowerCase()
        .replace(/\s/g, '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
)