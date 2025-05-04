import {exec} from "node:child_process"
import {marked} from 'marked'
import * as path from "node:path"
import process from "node:process"
import * as fs from "node:fs";

export const generateHtml = (weatherResponse: string, optionalResponse: string, conclusion: string) => {
    return`
    <!DOCTYPE html>
    <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Activity suggestion</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 24px;
                }
                h1, h2 {
                    color: #1a4e83;
                }
                section {
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 24px;
                }
            </style>
        </head>
        <body>
            <h1>Activity suggestion</h1>
            <section>
                <h2>Weather information</h2>
                ${marked(weatherResponse)}
            </section>    
            
            <section>
                <h2>Suggestion</h2>
                ${marked(optionalResponse)}
            </section>
            
            <section>
                <h2>Conclusion</h2>
                ${marked(conclusion)}
            </section>
        </body>
    </html>
    `
}

export const buildHtmlFileAndOpen = (weatherResponse: string, optionalResponse: string, conclusion: string) => {
    const html = generateHtml(weatherResponse, optionalResponse, conclusion)
    const fileName = 'activity_suggestion.html'
    fs.writeFile(fileName, html, (err) => {
        if (err) {
            console.error(`Error writing file: ${err}`)
            return
        }
        console.log(`HTML file created: ${fileName}`)
        openInBrowser(fileName)
    })
}

export const openInBrowser = (fileName: string) => {
    const filePath = path.resolve(fileName)
    const command = process.platform === 'win32'? 'start' : process.platform === 'darwin'? 'open' : 'xdg-open'

    exec(`${command} ${filePath}`, (error) => {
        if(error) {
            console.error(`Error opening file: ${error}`)
        }
    })
}