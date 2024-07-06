import styles from "./waitModal.module.scss";
import { CircularProgress, Modal } from "@mui/material";

type WaitModalProps = {
    msg: string;
    showSpinner?: boolean;
};
function WaitModal({ msg, showSpinner = false }: WaitModalProps) {
    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-loading"
                aria-describedby="modal-description-loading"
                className="foldables-wait-modal"
            >
                <div className={styles["content-container"]}>
                    {showSpinner && (
                        <CircularProgress
                            color="primary"
                            className={styles["loading-on-btn"]}
                            size={24}
                            sx={{ marginBottom: "16px" }}
                        />
                    )}
                    <div className={styles["msg-container"]}>{msg}</div>
                </div>
            </Modal>
        </>
    );
}
export default WaitModal;
