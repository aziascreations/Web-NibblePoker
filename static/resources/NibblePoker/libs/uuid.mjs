/**
 * Generates a random UUID4 and returns its string representation
 * @returns {`${string}-${string}-${string}-${string}-${string}`}
 */
export function generateUUID4(addHyphens, addGuidBrackets) {
    let uuid4 = crypto.randomUUID();
    if(!addHyphens) {
        uuid4 = uuid4.replace(/-/g, "");
    }
    if(addGuidBrackets) {
        uuid4 = "{" + uuid4 + "}";
    }
    return uuid4;
}
