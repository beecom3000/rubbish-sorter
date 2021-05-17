import {EventAggregator, inject} from 'aurelia';
import {HttpClient, HttpClientConfiguration, json} from '@aurelia/fetch-client';
import * as ml5 from 'ml5';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import {CustomMobileNet, TeachableMobileNet} from '@teachablemachine/image';

export const DEFAULT_TRAIN_MODEL_PATH = '/assets/trainmodel/';

@inject(HttpClient, EventAggregator)
export class ApiService {

    private modelFile: File;
    private weightsFile: File;
    private metadataFile: File;

    private customModel: CustomMobileNet;
    private tmModel: TeachableMobileNet;

    private initialised = false;

    constructor(private http: HttpClient, private ea : EventAggregator) {
        // classifier = ml5.imageClassifier(imageModelURL + 'model.json');
        http.configure((config: HttpClientConfiguration) => {
            config.withBaseUrl('http://localhost:3000');
            return config;
        });
    }

    public get model(): CustomMobileNet {
        return this.customModel;
    }

    public get tmodel(): TeachableMobileNet {
        return this.tmModel;
    }

    public async init() {
        if (this.initialised) return;
        this.modelFile = await this.load('model.json', 'application/json').then(f => f);
        this.metadataFile = await this.load('metadata.json', 'application/json').then(f => f);
        this.weightsFile = await this.load('weights.bin', 'application/macbinary').then(f => f);
        this.customModel = await tmImage.loadFromFiles(this.modelFile, this.weightsFile, this.metadataFile);
        console.log("Custom Model loaded!");
        this.tmModel = new TeachableMobileNet(this.customModel.model, this.customModel.getMetadata());
        this.initialised = true;
    }

    public get classNames(): string[] {
        return this.model.getClassLabels();
    }

    private async load(resource: string, resourceType: string, prefix?: string): Promise<File> {
        if (!prefix) {
            prefix = DEFAULT_TRAIN_MODEL_PATH;
        }
        const uri = prefix + resource;
        const file: File = await fetch(uri)
            .then(response => response.blob())
            .then(blobFile => new File([blobFile], `${resource}`, {type: `${resourceType}`}));
        console.info(`Loaded resource from ${uri}, type: ${file.type}, size: ${file.size}, last modified: ${file.lastModified}`);
        return file;
    }

    public async openBin(): Promise<any> {
        const response = await this.http.get('/open');
        return response.json();
    }

    public async closeBin(): Promise<any> {
        const response = await this.http.get('/close');
        return response.json();
    }

    public async checkStatus(): Promise<any> {
        const response = await this.http.get('/status');
        return response.json();
    }

}
