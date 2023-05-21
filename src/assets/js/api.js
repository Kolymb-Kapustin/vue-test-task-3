let designs = JSON.parse(localStorage.getItem('designs'))

const findIndex = (id) => {
    return designs.findIndex(el => el.id === id)
}

const getDesign = (id) => {
    return designs[findIndex(id)]
}

const getDesigns = () => {
    return designs
}

const updateDesigns = () => {
    designs = JSON.parse(localStorage.getItem('designs'))
}

const setDesigns = (payload) => {
    try {
        if (!designs || !designs.length) {
            console.log('111');
            const newDesigns = [];
            newDesigns.push(payload)
            console.log(payload);
            localStorage.setItem('designs', JSON.stringify(newDesigns))
            updateDesigns()
    
            return
        }
    
        const foundIndex = findIndex(payload.id);
        
        if (foundIndex !== -1) {
            designs.splice(foundIndex, 1, payload)
            localStorage.setItem('designs', JSON.stringify(designs))
        }
        else {
            designs.push(payload)
            localStorage.setItem('designs', JSON.stringify(designs))
        }
        updateDesigns()
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Локал сторедж заповенений')
        }
    }
}

const deleteDesign = (id) => {
    designs.splice(findIndex(id), 1)
    localStorage.setItem('designs', JSON.stringify(designs))
    updateDesigns()
}

export { getDesigns, setDesigns, deleteDesign, getDesign };