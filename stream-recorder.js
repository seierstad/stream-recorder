"use strict";

class StreamRecorder {

	constructor (audioContext, recorderOptions) {
		this.recordingsCount = 0;
		this.input = audioContext.createMediaStreamDestination();

		this.recorderDataHandler = this.recorderDataHandler.bind(this);

		if (navigator.mediaDevices) {
		    this.mediaRecorder = new MediaRecorder(this.input.stream, recorderOptions);
		    this.mediaRecorder.addEventListener("dataavailable", this.recorderDataHandler);
		}

		this.initHtml();
	}

	initHtml () {
		this._domElement = document.createElement("section");
		this._domElement.classList.add("stream-recorder");

	}

	get html () {
		return this._domElement;
	}

	start () {
		if (this.mediaRecorder) {
			this.mediaRecorder.start();
		}
	}

	stop () {
		if (this.mediaRecorder) {
			this.mediaRecorder.stop();
		}
	}

	recorderDataHandler (event) {
        // Push each chunk (blobs) in an array
        const url = URL.createObjectURL(event.data);
        const link = document.createElement("a");
        link.setAttribute("download", `tegne-lyd-${this.recordingsCount}.ogg`);
        link.innerText = "last ned lyd " + this.recordingsCount;
        this.recordingsCount += 1;
        link.href = url;
        document.body.appendChild(link);
	}
}

export {
	StreamRecorder
};
