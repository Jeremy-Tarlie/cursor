const puppeteer = require('puppeteer');
const path = require('path');

const TEST_TIMEOUT = 30000;

describe('Tests E2E - Générateur d\'Images', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        const htmlPath = path.join(__dirname, '../index.html');
        await page.goto(`file://${htmlPath}`);
    });

    afterEach(async () => {
        await page.close();
        jest.clearAllMocks();
    });

    test('Vérification du chargement initial de la page', async () => {
        const promptInput = await page.$('#promptInput');
        const generateBtn = await page.$('#generateBtn');
        const downloadBtn = await page.$('#downloadBtn');

        expect(promptInput).toBeTruthy();
        expect(generateBtn).toBeTruthy();
        expect(downloadBtn).toBeTruthy();

        const loadingIndicatorHidden = await page.$eval('#loadingIndicator', el => 
            el.classList.contains('hidden')
        );
        const errorMessageHidden = await page.$eval('#errorMessage', el => 
            el.classList.contains('hidden')
        );
        const imageContainerHidden = await page.$eval('#imageContainer', el => 
            el.classList.contains('hidden')
        );

        expect(loadingIndicatorHidden).toBeTruthy();
        expect(errorMessageHidden).toBeTruthy();
        expect(imageContainerHidden).toBeTruthy();
    }, TEST_TIMEOUT);

    test('Validation du champ de saisie vide', async () => {
        await page.click('#generateBtn');
        const errorVisible = await page.waitForSelector('#errorMessage:not(.hidden)');
        const errorText = await page.$eval('#errorMessage', el => el.textContent);

        expect(errorVisible).toBeTruthy();
        expect(errorText).toBe('Veuillez entrer une description pour l\'image.');
    }, TEST_TIMEOUT);

    test('Validation des mots-clés restreints', async () => {
        await page.type('#promptInput', 'Generate using dall-e 3');
        await page.click('#generateBtn');

        const errorText = await page.$eval('#errorMessage', el => el.textContent);
        expect(errorText).toBe('Cette demande utilise un modèle restreint. Veuillez utiliser un autre modèle.');
    }, TEST_TIMEOUT);

    test('Validation du contenu inapproprié', async () => {
        await page.type('#promptInput', 'Generate explicit violent content');
        await page.click('#generateBtn');

        const errorText = await page.$eval('#errorMessage', el => el.textContent);
        expect(errorText).toBe('Le contenu demandé n\'est pas approprié ou est interdit.');
    }, TEST_TIMEOUT);

    test('Simulation de la génération d\'image réussie', async () => {
        // Mock de la réponse de l'API
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().includes('simple-api.glif.app')) {
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        success: true,
                        output: 'https://example.com/fake-image.png'
                    })
                });
            } else if (request.url().includes('example.com/fake-image.png')) {
                request.respond({
                    status: 200,
                    contentType: 'image/png',
                    body: Buffer.from('fake-image-data')
                });
            } else {
                request.continue();
            }
        });

        await page.type('#promptInput', 'A beautiful landscape');
        await page.click('#generateBtn');

        await page.waitForSelector('#loadingIndicator:not(.hidden)', { timeout: 5000 });
        await page.waitForSelector('#loadingIndicator.hidden', { timeout: 5000 });
        await page.waitForSelector('#imageContainer:not(.hidden)', { timeout: 5000 });

        const imageUrl = await page.$eval('#generatedImage', img => img.src);
        expect(imageUrl).toContain('example.com/fake-image.png');
    }, TEST_TIMEOUT);

    test('Gestion des erreurs API', async () => {
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().includes('simple-api.glif.app')) {
                request.respond({
                    status: 401,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        error: 'Unauthorized',
                        message: 'Clé API invalide ou expirée'
                    })
                });
            } else {
                request.continue();
            }
        });

        await page.type('#promptInput', 'A beautiful landscape');
        await page.click('#generateBtn');

        await page.waitForSelector('#loadingIndicator:not(.hidden)', { timeout: 5000 });
        await page.waitForSelector('#loadingIndicator.hidden', { timeout: 5000 });
        await page.waitForSelector('#errorMessage:not(.hidden)', { timeout: 5000 });

        const errorText = await page.$eval('#errorMessage', el => el.textContent);
        expect(errorText).toContain('Clé API invalide ou expirée');
        
        const imageContainerHidden = await page.$eval('#imageContainer', el => 
            el.classList.contains('hidden')
        );
        expect(imageContainerHidden).toBe(true);
    }, TEST_TIMEOUT);

    test('Fonctionnalité de téléchargement', async () => {
        // Mock de la réponse de l'API et de l'image
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().includes('simple-api.glif.app')) {
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        success: true,
                        output: 'https://example.com/test-image.png'
                    })
                });
            } else if (request.url().includes('example.com/test-image.png')) {
                request.respond({
                    status: 200,
                    contentType: 'image/png',
                    body: Buffer.from('fake-image-data')
                });
            } else {
                request.continue();
            }
        });

        // Mock des fonctions URL
        await page.evaluateOnNewDocument(() => {
            window.URL.createObjectURL = jest.fn(() => 'blob:fake-url');
            window.URL.revokeObjectURL = jest.fn();
        });

        await page.type('#promptInput', 'A beautiful landscape');
        await page.click('#generateBtn');

        await page.waitForSelector('#loadingIndicator.hidden', { timeout: 5000 });
        await page.waitForSelector('#imageContainer:not(.hidden)', { timeout: 5000 });
        await page.waitForSelector('#generatedImage[src]', { timeout: 5000 });

        const downloadBtn = await page.$('#downloadBtn');
        expect(downloadBtn).not.toBeNull();
    }, TEST_TIMEOUT);
}); 