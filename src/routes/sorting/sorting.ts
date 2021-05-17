import {inject} from 'aurelia';
import {ApiService} from '../../services/api-service';
import * as tmImage from '@teachablemachine/image';
import {CustomMobileNet, IMAGE_SIZE, Webcam} from '@teachablemachine/image';
import {Prediction} from '../../model/prediction';
import {IViewModel} from '@aurelia/runtime-html';

enum SortingStatus { On = 'On', Off = 'Off' };

// Webcam Image size. Must be 227.
export const DEFAULT_IMAGE_SIZE = 265;

@inject(ApiService)
export class Sorting implements IViewModel {
    private flipWebcam: boolean;
    private webcam: Webcam;

    private webcamContainer: HTMLDivElement;

    private maxPredictions: number;

    private initialised = false;
    private webcamShow = false;
    private sortingStatus = SortingStatus.Off;

    private predictions: Array<Prediction>;
    private binStatus: string;

    public constructor(private apiService: ApiService) {
      this.predictions = [];
      this.flipWebcam = true;
    }

    public async binding() {
      await this.apiService.init();
      this.maxPredictions = this.apiService.model.getTotalClasses();
      const classLabels = this.apiService.model.getClassLabels();
      this.predictions = [];
      for (let i = 0; i < this.maxPredictions; i++) {
        this.predictions.push({
          'className': classLabels[i],
          'raw': 0,
          'value': 0,
        });
      }
      // await this.apiService.checkStatus().then(r => this.binStatus = r.status);
    }

    /**
     * Initialise webcam instance
     */
    public async init() {
      if (!this.initialised) {
        // this.maxPredictions = this.apiService.model.getTotalClasses();
        const classLabels = this.apiService.model.getClassLabels();

        // Convenience function to setup a webcam
        // const flip = true; // whether to flip the webcam
        this.webcam = new tmImage.Webcam(DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE); // width, height, flip
        await this.webcam.setup(); // request access to the webcam
        this.webcam.canvas.setAttribute('style', 'opacity: 1');
        this.initialised = true;
      }
    }

    /**
     * Start webcam and play the loop with prediction
     */
    public async start() {
      if (!this.initialised) {
        return;
      }
      this.webcam.play();
      window.requestAnimationFrame(this.loop);
      // await this.predict();

      // append elements to the DOM
      this.webcam.canvas.setAttribute('class', 'img-thumbnail');
      if (this.webcamContainer.childElementCount == 0) {
        this.webcamContainer.appendChild(this.webcam.canvas);
      }
      // this.webcam.canvas.removeAttribute('style');
    }

    public async stop() {
      await this.webcam.stop();
      this.webcam.canvas.setAttribute('style', 'opacity: 0.6');
      this.webcamContainer.removeChild(this.webcam.canvas);
    }

    public async pause() {
      await this.webcam.pause();
    }

    get loop() {
      return async () => {
        if (this.initialised) {
          this.webcam.update(); // update the webcam frame
          await this.predict();
          window.requestAnimationFrame(this.loop);
        }
      };
    }

    // run the webcam image through the image model
    async predict() {
      // predict can take in an image, video or canvas html element
      const prediction = await this.apiService.model.predict(this.webcam.canvas);
      this.predictions = [];
      for (let i = 0; i < this.maxPredictions; i++) {
        this.predictions.push({
          'className': prediction[i].className,
          'raw': prediction[i].probability,
          'value': Math.round(prediction[i].probability * 100),
        });
      }
    }

    public onFlip(event): void {
      this.webcam.flip = event.target.checked;
      this.flipWebcam = event.target.checked;
    }

    public async onSortingChange(event) {
      this.sortingStatus = SortingStatus.Off;
      this.webcamShow = false;
      if (event.target.checked) {
        await this.init();
        await this.start();
        this.sortingStatus = SortingStatus.On;
        this.webcamShow = true;
      } else {
        await this.stop();
        // clear prediction scale
        this.predictions.forEach((v) => {
          v['raw'] = 0;
          v['value'] = 0;
        });
        this.initialised = false;
      }
    }

    public openCloseBin() {
      this.apiService.checkStatus().then((r) => {
        if (r.status === 'on') {
          this.apiService.closeBin();
        } else {
          this.apiService.openBin();
        }
        this.binStatus = r.status;
      });
    }
}
