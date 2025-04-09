// Configuration
class GlifConfig {
    static API_ENDPOINT = 'https://simple-api.glif.app';
    static GLIF_ID = 'cm90jwu9e0005jp03qyc38md9';
    static API_KEY = 'glif_cfd773c66d3d5155e0e9ea02315019685484a5d83c418df8d349cb233fc1e1a8';
    
    static RESTRICTED_KEYWORDS = [
        'stablediffusion 3',
        'dall-e 3',
        'dalle3',
        'sd3',
        'flux pro',
        'flux dev',
        'comfyblock'
    ];

    static ERROR_MESSAGES = {
        NO_PROMPT: 'Veuillez entrer une description pour l\'image.',
        NO_API_KEY: 'Clé API manquante. Veuillez configurer votre clé API Glif.',
        NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
        API_ERROR: 'Erreur de l\'API Glif: ',
        UNAUTHORIZED: 'Clé API invalide ou expirée.',
        RATE_LIMIT: 'Limite de requêtes atteinte. Veuillez réessayer plus tard.',
        DEFAULT: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
        RESTRICTED_MODEL: 'Cette demande utilise un modèle restreint. Veuillez utiliser un autre modèle.',
        INAPPROPRIATE_CONTENT: 'Le contenu demandé n\'est pas approprié ou est interdit.',
        FORBIDDEN: 'Cette requête n\'est pas autorisée.',
        MODEL_UNAVAILABLE: 'Le modèle demandé n\'est pas disponible actuellement.',
        UNKNOWN_ERROR: 'Erreur inconnue: {0}. Code d\'erreur: {1}',
        TIMEOUT_ERROR: 'La requête a pris trop de temps. Veuillez réessayer.',
        PARSE_ERROR: 'Erreur lors du traitement de la réponse du serveur.',
        SERVER_ERROR: 'Erreur serveur (code {0}). Veuillez réessayer plus tard.'
    };
}

class ValidationService {
    static inappropriatePatterns = [
        /violence/i,
        /explicit/i,
        /nsfw/i,
        /nude/i,
        /hack/i,
        /crack/i,
        /exploit/i
    ];

    static containsRestrictedKeywords(prompt) {
        const promptLower = prompt.toLowerCase();
        return GlifConfig.RESTRICTED_KEYWORDS.some(keyword => 
            promptLower.includes(keyword.toLowerCase())
        );
    }

    static isAppropriateRequest(prompt) {
        return !this.inappropriatePatterns.some(pattern => pattern.test(prompt));
    }
}

class ErrorHandler {
    static formatErrorMessage(template, ...args) {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }

    static getDetailedErrorMessage(error, response = null) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return GlifConfig.ERROR_MESSAGES.NETWORK_ERROR;
        }

        if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
            return GlifConfig.ERROR_MESSAGES.TIMEOUT_ERROR;
        }

        if (error instanceof SyntaxError) {
            return GlifConfig.ERROR_MESSAGES.PARSE_ERROR;
        }

        if (response) {
            return this.handleHttpError(response, error);
        }

        if (typeof error.message === 'string') {
            return this.handleApiError(error);
        }

        return this.formatErrorMessage(
            GlifConfig.ERROR_MESSAGES.UNKNOWN_ERROR,
            error.message || 'Pas de détails disponibles',
            error.code || 'inconnu'
        );
    }

    static handleHttpError(response, error) {
        const errorMap = {
            400: `${GlifConfig.ERROR_MESSAGES.API_ERROR}Requête invalide`,
            401: GlifConfig.ERROR_MESSAGES.UNAUTHORIZED,
            403: GlifConfig.ERROR_MESSAGES.FORBIDDEN,
            404: `${GlifConfig.ERROR_MESSAGES.API_ERROR}Modèle non trouvé`,
            429: GlifConfig.ERROR_MESSAGES.RATE_LIMIT,
            451: GlifConfig.ERROR_MESSAGES.INAPPROPRIATE_CONTENT,
            503: GlifConfig.ERROR_MESSAGES.MODEL_UNAVAILABLE
        };

        if ([500, 502, 504].includes(response.status)) {
            return this.formatErrorMessage(GlifConfig.ERROR_MESSAGES.SERVER_ERROR, response.status);
        }

        return errorMap[response.status] || 
            this.formatErrorMessage(GlifConfig.ERROR_MESSAGES.UNKNOWN_ERROR, error.message, response.status);
    }

    static handleApiError(error) {
        const errorLower = error.message.toLowerCase();
        if (errorLower.includes('restricted') || errorLower.includes('forbidden')) {
            return GlifConfig.ERROR_MESSAGES.RESTRICTED_MODEL;
        }
        if (errorLower.includes('inappropriate')) {
            return GlifConfig.ERROR_MESSAGES.INAPPROPRIATE_CONTENT;
        }
        if (errorLower.includes('rate limit')) {
            return GlifConfig.ERROR_MESSAGES.RATE_LIMIT;
        }
        return error.message;
    }
}

class UIManager {
    constructor() {
        this.elements = {
            promptInput: document.getElementById('promptInput'),
            generateBtn: document.getElementById('generateBtn'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            imageContainer: document.getElementById('imageContainer'),
            generatedImage: document.getElementById('generatedImage'),
            errorMessage: document.getElementById('errorMessage'),
            downloadBtn: document.getElementById('downloadBtn')
        };
        this.bindEvents();
    }

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.classList.remove('hidden');
        this.elements.loadingIndicator.classList.add('hidden');
        this.elements.imageContainer.classList.add('hidden');
        this.elements.generateBtn.disabled = false;
    }

    resetUI() {
        this.elements.errorMessage.classList.add('hidden');
        this.elements.loadingIndicator.classList.add('hidden');
        this.elements.imageContainer.classList.add('hidden');
        this.elements.generateBtn.disabled = false;
        this.elements.generatedImage.src = '';
    }

    showLoading() {
        this.resetUI();
        this.elements.loadingIndicator.classList.remove('hidden');
        this.elements.generateBtn.disabled = true;
    }

    async showImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = this.elements.generatedImage;
            
            const onLoad = () => {
                this.elements.loadingIndicator.classList.add('hidden');
                this.elements.imageContainer.classList.remove('hidden');
                this.elements.errorMessage.classList.add('hidden');
                this.elements.generateBtn.disabled = false;
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
                resolve();
            };

            const onError = () => {
                this.elements.loadingIndicator.classList.add('hidden');
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
                reject(new Error('Erreur lors du chargement de l\'image'));
            };

            img.addEventListener('load', onLoad);
            img.addEventListener('error', onError);
            img.src = imageUrl;
        });
    }

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', async () => {
            await imageGenerator.generateImage();
        });

        this.elements.downloadBtn.addEventListener('click', async () => {
            await imageGenerator.downloadImage();
        });

        this.elements.promptInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                await imageGenerator.generateImage();
            }
        });
    }
}

class ImageGenerator {
    constructor() {
        this.ui = new UIManager();
        this.currentRequest = null;
    }

    async generateImage() {
        const prompt = this.ui.elements.promptInput.value.trim();
        
        if (!this.validateRequest(prompt)) {
            return;
        }

        // Annuler la requête précédente si elle existe
        if (this.currentRequest) {
            this.currentRequest.abort();
        }

        this.ui.showLoading();

        try {
            const imageUrl = await this.makeApiRequest(prompt);
            await this.ui.showImage(imageUrl);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Requête annulée');
                return;
            }
            console.error('Erreur détaillée:', error);
            this.ui.showError(ErrorHandler.getDetailedErrorMessage(error));
        } finally {
            this.currentRequest = null;
        }
    }

    validateRequest(prompt) {
        if (!prompt) {
            this.ui.showError(GlifConfig.ERROR_MESSAGES.NO_PROMPT);
            return false;
        }
        
        if (!GlifConfig.API_KEY) {
            this.ui.showError(GlifConfig.ERROR_MESSAGES.NO_API_KEY);
            return false;
        }

        if (ValidationService.containsRestrictedKeywords(prompt)) {
            this.ui.showError(GlifConfig.ERROR_MESSAGES.RESTRICTED_MODEL);
            return false;
        }

        if (!ValidationService.isAppropriateRequest(prompt)) {
            this.ui.showError(GlifConfig.ERROR_MESSAGES.INAPPROPRIATE_CONTENT);
            return false;
        }

        return true;
    }

    async makeApiRequest(prompt) {
        const controller = new AbortController();
        this.currentRequest = controller;
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(GlifConfig.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GlifConfig.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: GlifConfig.GLIF_ID,
                    inputs: [prompt]
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error = new Error(errorData.error || errorData.message || 'Erreur serveur');
                error.status = response.status;
                throw error;
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (!data.output) {
                throw new Error('Aucune image n\'a été générée');
            }

            return data.output;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.status === 401) {
                throw new Error(GlifConfig.ERROR_MESSAGES.UNAUTHORIZED);
            }
            throw error;
        } finally {
            this.currentRequest = null;
        }
    }

    async downloadImage() {
        const imgSrc = this.ui.elements.generatedImage.src;
        if (!imgSrc || imgSrc === window.location.href) {
            this.ui.showError('Aucune image à télécharger.');
            return;
        }
        
        try {
            const response = await fetch(imgSrc);
            if (!response.ok) throw new Error('Erreur lors du téléchargement');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image-generee.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            this.ui.showError('Erreur lors du téléchargement de l\'image.');
        }
    }
}

// Initialisation
const imageGenerator = new ImageGenerator(); 