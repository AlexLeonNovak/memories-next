export const generateSymbolsFromText = (text: string, className: string) => {
    return text.split('').map((symbol, index) => {
        const value = symbol !== ' ' ? symbol : <div>&nbsp;</div>;
        return (
            <div key={index} className={className}>
                {value}
            </div>
        );
    });
};