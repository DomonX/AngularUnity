using UnityEngine;
using System.Runtime.InteropServices;

public class Movement : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void MyMessage(string vec);

    void Update()
    {
        Vector3 currentRotation = transform.rotation.eulerAngles + (new Vector3(-Input.GetAxis("Mouse Y"), Input.GetAxis("Mouse X"), 0.0f) * Time.deltaTime * 350.0f);
        transform.rotation = Quaternion.Euler(currentRotation);

        if (Input.GetKey(KeyCode.W))
        {
            transform.position += transform.forward * Time.deltaTime * 5.0f;
            MyMessage(transform.position.ToString());
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
    }
}
