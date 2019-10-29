export default (value) => {

    const date = new Date(value);

    return date.toDateString(['pt-BR'], {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

}