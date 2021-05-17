import {bindable} from 'aurelia';
import {Prediction} from '../../model/prediction';

export class PredictionDetail {
    @bindable private prediction: Prediction;

    public get valueStyle() {
        return `width: ${this.prediction.value}%`;
    }

}
