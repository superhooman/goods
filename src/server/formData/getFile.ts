export const getFile = async (request: Request, fieldname: string) => {
    const formData = await request.formData();

    const file = formData.get(fieldname);

    if (typeof file === 'string') {
        throw new Error('File is a string');
    }

    if (!file) throw new Error('No file');

    return [file, formData] as [File, FormData];
};
