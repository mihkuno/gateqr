import cv2

cap = cv2.VideoCapture(0)
detector = cv2.QRCodeDetector()

paused = False
qr_data = None
snapshot = None

clicked = False

# Button area (x1, y1, x2, y2)
btn_x1, btn_y1 = 200, 120
btn_x2, btn_y2 = 400, 180


def mouse_callback(event, x, y, flags, param):
    global clicked

    if event == cv2.EVENT_LBUTTONDOWN:
        if btn_x1 <= x <= btn_x2 and btn_y1 <= y <= btn_y2:
            clicked = True


def show_prompt(image, data):
    global clicked
    clicked = False

    win_name = "QR Detected"
    cv2.namedWindow(win_name)
    cv2.setMouseCallback(win_name, mouse_callback)

    while True:
        display = image.copy()

        # Text
        cv2.putText(display, f"QR Code: {data}",
                    (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2)

        # Draw button
        cv2.rectangle(display, (btn_x1, btn_y1), (btn_x2, btn_y2), (50, 200, 50), -1)
        cv2.putText(display, "CONTINUE",
                    (btn_x1 + 25, btn_y1 + 40),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8, (255, 255, 255), 2)

        cv2.imshow(win_name, display)

        if clicked:
            break

        if cv2.waitKey(1) == 27:  # ESC to force exit
            exit()

    cv2.destroyWindow(win_name)


while True:
    if not paused:
        ret, frame = cap.read()
        if not ret:
            break

        data, bbox, _ = detector.detectAndDecode(frame)

        cv2.imshow("Scanner", frame)

        if data:
            try:
                qr_data = int(data)
            except:
                qr_data = data

            snapshot = frame.copy()
            print("QR Code detected:", qr_data)

            paused = True
            show_prompt(snapshot, qr_data)
            paused = False

    if cv2.waitKey(1) == 27:  # ESC
        break

cap.release()
cv2.destroyAllWindows()