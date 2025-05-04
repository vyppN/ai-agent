import { exec } from "node:child_process";
import * as path from "node:path";
import { marked } from 'marked'

export const generateHtml = (weatherResponse: string, suggestions: string, criticizeResponse: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Weather Report and Suggestions</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2 {
                    color: #2c3e50;
                }
                .section {
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Weather Report and Suggestions</h1>
            
            <div class="section">
                <h2>Weather Information</h2>
                ${marked(weatherResponse)}
            </div>
            
            <div class="section">
                <h2>Suggestions</h2>
                ${marked(suggestions)}
            </div>
            
            <div class="section">
                <h2>Criticism</h2>
                ${marked(criticizeResponse)}
            </div>
        </body>
        </html>
        `;
}

export const openInBrowser = (filename: string) => {
    const filePath = path.resolve(filename);
    const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';

    exec(`${command} ${filePath}`, (error) => {
        if (error) {
            console.error(`Failed to open file in browser: ${error}`);
        }
    });
}