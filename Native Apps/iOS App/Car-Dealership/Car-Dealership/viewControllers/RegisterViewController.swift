//
//  RegisterViewController.swift
//  Car-Dealership
//
//  Created by PBen on 13/02/24.
//

import UIKit
import Alamofire

class RegisterViewController: BaseViewController {
    @IBOutlet weak var editName: UITextField!
    
    @IBOutlet weak var editMail: UITextField!
    
    @IBOutlet weak var editPass: UITextField!
    @IBOutlet weak var editAddress: UITextField!
    @IBOutlet weak var editPhone: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func onRegisterUser(_ sender: Any) {
        if(editName.text!.count == 0)
        {
            showError(message: "Please Enter Name Fisrt")
        }
        else if(editPass.text!.count == 0){
            showError(message: "Please Enter Your Password First")
        }
        else if(editMail.text!.count == 0){
            showError(message: "Please Enter Your EMail First")
        }
        else if(editPhone.text!.count == 0){
            showError(message: "Please Enter Your Phone First")
        }
        else if(editAddress.text!.count == 0){
            showError(message: "Please Enter Your Adress First")
        }
        else{
            let url = createURL(path: "/customers/")
            
            let info: [String: Any] =
            ["Name":editName.text!,
             "Email":editMail.text!,
             "Phone":editPhone.text!,
             "Address":editAddress.text!,
             "Password":editPass.text!
            ]
            
            
            let req=AF.request(url,method: .post,parameters: info,encoding: JSONEncoding.default)
            
            
            let res=req.response(completionHandler: {response in
                
                if let data = response.data{
                    
                    let json = try! JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                   // print(json)
                    
                    if(json!["message"] as! String=="success"){
                        //self.showSuccess(message: "Register Successful")
                        let sc=self.view.window?.windowScene?.delegate as! SceneDelegate
                        sc.startLogin()
                    }
                    else {self.showError(message: json!["result"] as! String)}
                    
                }
                
                
                
                
            })
            
            
        }
    }
    
}
