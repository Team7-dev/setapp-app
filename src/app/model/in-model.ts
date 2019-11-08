export class InModel {

    fromObject(obj: object) {
        for (const propName of Object.keys(obj)) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Encontra um ou vários elementos dentro de um array.
     * Use TYPE_ARRAY para retornar mais de um valor.
     */
    findInArray(array: any[], prop: string, value: any, returnType: string = 'object') {
        const findData: any[] = [];

        for (let index = 0; index < array.length; ++index) {
            if (array[index][prop] === value) {

                if (returnType === 'object') {
                    return array[index];
                }

                findData.push(array[index]);
            }
        }

        if (returnType === 'array') {
            return findData;
        }

        return false;
    }
}
