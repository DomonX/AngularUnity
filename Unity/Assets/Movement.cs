using UnityEngine;
using System.Runtime.InteropServices;

public class Movement : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void MyMessage(string vec);

    private bool cameraActive = false;

    public float speed = 5.0f;

    public Animator animator;

    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
        cameraActive = true;
        this.animator = GetComponent<Animator>();
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
            float y = Input.GetAxis("Mouse X");
            Vector3 currentRotation = transform.rotation.eulerAngles + (new Vector3(0.0f, y, 0.0f) * Time.deltaTime * 350.0f);
            transform.rotation = Quaternion.Euler(currentRotation);
        }
    }

    private void HandleCharacterMovement()
    {
        if (Input.GetKey(KeyCode.W))
        {
            this.animator.SetBool("isWalking", true);
            transform.position += transform.forward * Time.deltaTime * speed;
        }
        else
        {
            this.animator.SetBool("isWalking", false);
        }

        if (Input.GetKey(KeyCode.S))
        {
            this.animator.SetBool("isWalkingBackwards", true);
            transform.position += transform.forward * Time.deltaTime * -speed;
        }
        else
        {
            this.animator.SetBool("isWalkingBackwards", false);
        }

        if (Input.GetKey(KeyCode.D))
        {
            this.animator.SetBool("isWalkingRight", true);
            transform.position += transform.right * Time.deltaTime * speed;
        }
        else
        {
            this.animator.SetBool("isWalkingRight", false);
        }

        if (Input.GetKey(KeyCode.A))
        {
            this.animator.SetBool("isWalkingLeft", true);
            transform.position += transform.right * Time.deltaTime * -speed;
        }
        else
        {
            this.animator.SetBool("isWalkingLeft", false);
        }



        try
        {

            MyMessage(transform.position.ToString());
        }
        catch
        {

        }



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
