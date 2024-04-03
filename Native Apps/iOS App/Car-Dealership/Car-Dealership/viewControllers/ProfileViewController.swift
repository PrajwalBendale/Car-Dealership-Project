//
//  ProfileViewController.swift
//  Car-Dealership
//
//  Created by PBen on 19/02/24.
//

import UIKit

class ProfileViewController: BaseViewController,UITableViewDelegate,UITableViewDataSource  {
    
    
    @IBOutlet weak var profileTable: UITableView!
    
    let options = ["Update My Profile", "Change Password", "Logout"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        profileTable.dataSource=self
        profileTable.delegate=self
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return options.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .default, reuseIdentifier: nil)
        
        cell.textLabel?.text=options[indexPath.row]
        cell.accessoryType = .disclosureIndicator
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.row==2 {
            let defaults = UserDefaults.standard
            defaults.setValue(false, forKey: "LOGIN_STATUS")
            defaults.setValue("", forKey: "User_id")
            defaults.setValue("", forKey: "USER_NAME")
            defaults.synchronize()
            showSuccess(message: "You have logged out..!!")
            let sc =  self.view.window?.windowScene?.delegate as! SceneDelegate
            sc.startLogin()
            /*
             defaults.setValue(true, forKey: "LOGIN_STATUS")
             defaults.setValue(id, forKey: "User_id")
             defaults.setValue(name, forKey: "USER_NAME")
             */
        }
    }

    

}
