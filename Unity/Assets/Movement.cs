using UnityEngine;
using System.Runtime.InteropServices;

public class Movement : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void MyMessage(string vec);

    private bool cameraActive = false;

    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
        cameraActive = true;
    }



    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape) && Cursor.lockState == CursorLockMode.Locked)
        {
            LockMovement();
        }

        if (Input.GetMouseButtonDown(0))
        {
            UnlockMovement();
        }

        HandleMovement();
    }

    private void LockMovement()
    {
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
        cameraActive = false;
    }

    private void UnlockMovement()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
        cameraActive = true;
    }

    private void HandleMouseMovement()
    {
        if (cameraActive)
        {
            // {
            //     float x = -Input.GetAxis("Mouse Y");
            float y = Input.GetAxis("Mouse X");
            Vector3 currentRotation = transform.rotation.eulerAngles + (new Vector3(0.0f, y, 0.0f) * Time.deltaTime * 350.0f);
            //     Debug.Log(Mathf.Clamp(currentRotation.x, -90.0f, 90.0f));sa
            //     currentRotation = new Vector3(currentRotation.x, currentRotation.y, 0.0f);
            transform.rotation = Quaternion.Euler(currentRotation);
        }
    }

    private void HandleCharacterMovement()
    {
        if (Input.GetKey(KeyCode.W))
        {
            transform.position += transform.forward * Time.deltaTime * 5.0f;
        }

        if (Input.GetKey(KeyCode.S))
        {
            transform.position += transform.forward * Time.deltaTime * -5.0f;
        }

        if (Input.GetKey(KeyCode.D))
        {
            transform.position += transform.right * Time.deltaTime * 5.0f;
        }

        if (Input.GetKey(KeyCode.A))
        {
            transform.position += transform.right * Time.deltaTime * -5.0f;
        }

        MyMessage(transform.position.ToString());

    }

    private void HandleMovement()
    {
        if (cameraActive)
        {
            HandleMouseMovement();
            HandleCharacterMovement();
        }
    }
}
