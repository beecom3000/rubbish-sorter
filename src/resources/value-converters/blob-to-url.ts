import {valueConverter, ValueConverterInstance } from "aurelia";

@valueConverter({ name: 'blobToUrl' })
export class BlobToUrl implements ValueConverterInstance {
    toView(blob) {
        return URL.createObjectURL(blob);
    }
}
