Feature: page Opencart test 

    open cart page

    Scenario: Filling register form
    Given I open register opencart page
    When I fill the form register
    |First Name  | Last Name | email                | tel        | passwd |
    |Duc Anh     | Nguyen    | ndanh9@cmcmglobal.vn | 0123456789 | 123456 |
    Then select submit and verify

