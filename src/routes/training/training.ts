import * as ml5 from 'ml5';
import {IViewModel} from '@aurelia/runtime-html';
import {inject} from "aurelia";
import {ApiService} from "../../services/api-service";
import {Webcam} from "@teachablemachine/image";
import * as tmImage from "@teachablemachine/image";
import {isNumber} from "@aurelia/testing/dist/util";
import * as knnClassifier from '@tensorflow-models/knn-classifier';

@inject(ApiService)
export class Training implements IViewModel {

    private selectedClassIndex: string;
    private selectedClassName: string;
    private classNames: string[];

    private webcam: Webcam;
    private trainCamContainer: HTMLDivElement;

    constructor(private apiService: ApiService) {
    }

    public async binding() {
        await this.apiService.init();
        this.classNames = this.apiService.classNames;
        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        this.webcam = new tmImage.Webcam(224, 224, flip); // width, height, flip

        await this.webcam.setup(); // request access to the webcam
        await this.webcam.play();
        window.requestAnimationFrame(this.loop);
    }

    public bound() {
        if (this.trainCamContainer && this.trainCamContainer.childElementCount == 0) {
            this.trainCamContainer.appendChild(this.webcam.canvas);
        }
    }

    public selectedClassChange(event): void {
        this.selectedClassName = this.classNames.find( (v, index) => index === parseInt(this.selectedClassIndex));
        if (this.selectedClassName === 'plastic') {
            console.log('plsatic');
        }
    }

    get loop() {
        return async () => {
            this.webcam.update(); // update the webcam frame
            window.requestAnimationFrame(this.loop);
        };
    }

    public async train() {
        console.log(`Selected Label: ${this.selectedClassName}, index: ${this.selectedClassIndex}`);
        let sample = this.webcam.canvas;
        let classIndex = parseInt(this.selectedClassIndex);
        await this.apiService.tmodel.addExample(classIndex, sample);
    }

}
