export default function cleanAIResponse(response: string): any {
    let cleaned = response.trim();
    
    cleaned = cleaned
        .replace(/^```(?:json)?\n?/gm, '')  
        .replace(/\n?```$/gm, '')            
        .trim();
    
    if (cleaned.startsWith('`') && cleaned.endsWith('`')) {
        cleaned = cleaned.slice(1, -1).trim();
    }
    
    return JSON.parse(cleaned);
}