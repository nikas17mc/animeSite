/*!
 * anii
 * 
 * MIT Licensed
 */


require('dotenv').config();
const path = require('path');
const fs = require('fs/promises');

/**
 * Methods variable
 * @private
 */
const limit = 25;
const url = process.env.URL || path.join(__dirname + "../../../data/animeDatabase.json");

if (!url) {
    throw new Error("Environment variable URL is not defined.");
}




/**
 * Get number of the Movie
 * @param {Number} id - The Id of movie
 * 
 * Returns the Movie with list of all available languages
 * @returns {Promise<object>} Movie with his list
 * 
 * @public
 */
async function get(id) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ movieId: id })
        });
        if (!response.ok) {
            const errorData = await response.json().catch((error) => ({}));
            throw new Error(`Error: ${response.status} - ${errorData.error || "Unknown error"}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `Failed to fetch movie: ${error.message}`);
    }

}

// /**
//  * 
//  * @param {*} movieID 
//  */
// function set(movieID){

// }

/**
 * @param {Number} page 
 * Return list of movies
 * @returns {Promise<object>} 
 * @public 
 */
async function list(page) {
    try {
        // Datenbank laden
        const rawData = await fs.readFile(url, 'utf8');
        const dataList = JSON.parse(rawData);
        const data = dataList.data;

        // Berechne Start- und Endindex
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Entnehme die benötigten Daten
        const paginatedData = data.slice(startIndex, endIndex);

        // Prüfe, ob es eine vorrige / nächste Seite gibt
        const hasPrevPage = page > 1;
        const hasNextPage = endIndex < data.length;



        // const response = await fetch(url, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "GET"
        // });

        // if (!response.ok) {
        //     const errorData = await response.json().catch((error) => ({}));
        //     throw new Error(`Error: ${response.status} - ${errorData.error || "Unknown error"}`)
        // }
        // const data = await response.json();



        return {
            pageNumber: page,
            totalItems: data.length,
            totalPages: Math.ceil(data.length / limit),
            hasPrevPage,
            hasNextPage,
            data: paginatedData
        };
    } catch (error) {
        console.error(`Failed to fetch movie list: ${error.message}`);
        return null;
    }
}

/**
 * 
 */
async function search(input) {


}




/**
 * Module Exports
 * @public
 */
module.exports = {
    get,
    // set,
    list,
    search
}