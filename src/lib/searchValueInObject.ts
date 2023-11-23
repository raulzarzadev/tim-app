const searchValueInObject = (obj: any, search: string): boolean => {
  // Recorre todas las propiedades del objeto
  for (const prop in obj) {
    // Verifica si el valor de la propiedad es un objeto
    if (typeof obj[prop] === 'object') {
      // Verifica si el valor de la propiedad es un array
      if (Array.isArray(obj[prop])) {
        // Recorre todos los elementos del array
        for (const item of obj[prop]) {
          // Llama recursivamente a la función para buscar en el elemento del array
          if (searchValueInObject(item, search)) {
            return true
          }
        }
      } else {
        // Llama recursivamente a la función para buscar en el objeto interno
        if (searchValueInObject(obj[prop], search)) {
          return true
        }
      }
    } else {
      // Verifica si el valor de la propiedad contiene el valor de búsqueda
      if (
        obj[prop]?.toString()?.toLowerCase()?.includes(search.toLowerCase())
      ) {
        return true
      }
    }
  }
  return false
}
export default searchValueInObject
