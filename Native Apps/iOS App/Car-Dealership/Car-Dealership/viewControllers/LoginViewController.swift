//
//  LoginViewController.swift
//  Car-Dealership
//
//  Created by PBen on 13/02/24.
//

import UIKit
import Alamofire

class LoginViewController: BaseViewController {

    @IBOutlet weak var editPass: UITextField!
    @IBOutlet weak var editName: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()

        
    }
    
    @IBAction func onLogin(_ sender: Any) {
        if(editName.text!.count == 0){
            showError(message: "Please Enter Email Fisrt")
        }else if(editPass.text!.count == 0){
            showError(message: "Please Enter Your Password First")
        }
        else{
            let url = createURL(path: "/customers/login")
            
            let info: [String: Any] = ["Email":editName.text!,
                        "Password":editPass.text!]
            
            let req=AF.request(url,method: .post,parameters: info,encoding: JSONEncoding.default)
            
            
            req.response(completionHandler: { response in
                if let data = response.data{

                    let json = try! JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                    
                    if(json!["message"] as! String=="success"){
                        //print(json!["result"])
                        //self.showSuccess(message: "Login Successful")
                        let defaults = UserDefaults.standard
                        let userData = json!["result"] as! [[String: Any]]
                        for user in userData {
                            
                            
                            let name = user["name"]!
                            let id = user["CustomerId"]!
                            
                            // set the login flag to true
                            defaults.setValue(true, forKey: "LOGIN_STATUS")
                            defaults.setValue(id, forKey: "User_id")
                            defaults.setValue(name, forKey: "USER_NAME")
                        }
                        let sc=self.view.window?.windowScene?.delegate as! SceneDelegate
                        sc.startHome()
                    }
                    else {self.showError(message: json!["message"] as! String)}
                    
                    
                }
                
                
            })
            
            
            
        }
        
    }
    
    

}
