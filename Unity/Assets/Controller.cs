using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Controller : MonoBehaviour
{

    public GameObject desk;
    private bool added = false;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void addDesk()
    {
        if (added)
        {
            return;
        }
        GameObject.Instantiate(desk);
    }


}
