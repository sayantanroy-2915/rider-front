import { Modal } from "antd";

export const warningDialog = (msg) => {
	Modal.warning({title: "Warning", content: msg});
}

export const successDialog = (msg) => {
	Modal.success({title: "Success", content: msg});
}

export const errorDialog = (msg) => {
	Modal.error({title: "Error", content: msg});
}

export const infoDialog = (msg) => {
	Modal.info({content: msg});
}