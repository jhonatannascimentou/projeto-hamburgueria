// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const { nomePedido } = require('../public/app.js');

// Função para criar um card no Trello
const criarCardTrello = async () => {
    try {
        const response = await fetch(`https://api.trello.com/1/cards?idList=68dc6c0091ad86a76589c71f&key=8055bc05a6e0e98eb3ba6de21769af93&token=ATTAe8bd7d8962f56eda910ebb0f08540d0784839737c0a91bcd505d1440bc8e2ffcD79CFE46&name=${nomePedido}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(`Response: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log(text);
        return text;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { criarCardTrello };