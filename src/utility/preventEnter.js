export function preventEnter(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
    }
}