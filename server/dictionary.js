const fs = require('fs');
const path = require('path');

// Initialize dictionary as a Set for O(1) lookups
let dictionary = new Set();

// Load dictionary from file
function initializeDictionary() {
    try {
        const dictionaryPath = path.join(__dirname, 'data', 'scrabble_words.txt');
        const words = fs.readFileSync(dictionaryPath, 'utf8').split('\n');
        dictionary = new Set(words.map(word => word.trim().toUpperCase()));
        console.log(`Dictionary initialized with ${dictionary.size} words`);
    } catch (error) {
        console.error('Error loading dictionary:', error);
        // Initialize with empty set if file can't be loaded
        dictionary = new Set();
    }
}

// Check if a word is valid
function isValidWord(word) {
    return dictionary.has(word.toUpperCase());
}

// Get all valid words of a certain length
function getWordsOfLength(length) {
    return Array.from(dictionary).filter(word => word.length === length);
}

// Initialize dictionary when module is loaded
initializeDictionary();
console.log("DICTIONARY" + dictionary);

module.exports = {
    isValidWord,
    getWordsOfLength,
    dictionary
};
