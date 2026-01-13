import { useState } from "react";
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faSave, faSpinner, faUserShield, faCog } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../../components/AdminHeader";

const Settings = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("success");
    const [saving, setSaving] = useState(false);

    const togglePassword = () => setPasswordVisible(!passwordVisible);
    const toggleConfirm = () => setConfirmVisible(!confirmVisible);

    const passwordStrength = () => {
        let strength = 0;
        if (password.length >= 8) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        return strength;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password && password !== confirm) {
            setNotificationType("error");
            setNotification("Passwords do not match");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        setSaving(true);
        setNotificationType("success");
        setNotification("Saving settings...");
        setTimeout(() => {
            setSaving(false);
            setNotification("Settings successfully updated!");
            setTimeout(() => setNotification(""), 3000);
        }, 1500);
    };

    return (
        <div>
            <AdminHeader/>
            <div className={styles.pageWrapper}>

                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1><FontAwesomeIcon icon={faCog} /> Admin Settings</h1>
                        <p>Manage your account preferences</p>
                    </div>

                    <div className={styles.adminInfo}>
                        <div className={styles.adminIcon}>
                            <FontAwesomeIcon icon={faUserShield} />
                        </div>
                        <div className={styles.adminDetails}>
                            <h2>Administrator Account</h2>
                            <p>Full access to system settings</p>
                        </div>
                    </div>

                    {notification && (
                        <div className={`${styles.notification} ${notificationType === "error" ? styles.error : ""}`}>
                            {notification}
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username"><FontAwesomeIcon icon={faUser} /> Username</label>
                            <input type="text" id="username" defaultValue="admin123" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                            <input type="email" id="email" defaultValue="admin@gmail.com" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Change Password</label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" className={styles.passwordToggle} onClick={togglePassword}>
                                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                            </button>
                            <div className={styles.passwordStrength}>
                                <div
                                    className={styles.passwordStrengthBar}
                                    style={{
                                        width: `${passwordStrength()}%`,
                                        background:
                                            passwordStrength() < 40
                                                ? "#f44336"
                                                : passwordStrength() < 80
                                                    ? "#ff9800"
                                                    : "#4caf50",
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirm"><FontAwesomeIcon icon={faLock} /> Confirm Password</label>
                            <input
                                type={confirmVisible ? "text" : "password"}
                                id="confirm"
                                placeholder="Confirm new password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                            <button type="button" className={styles.passwordToggle} onClick={toggleConfirm}>
                                <FontAwesomeIcon icon={confirmVisible ? faEyeSlash : faEye} />
                            </button>
                        </div>

                        <button type="submit" className={styles.btn} disabled={saving}>
                            {saving ? <FontAwesomeIcon icon={faSpinner} spin /> : <><FontAwesomeIcon icon={faSave} /> Save Changes</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
