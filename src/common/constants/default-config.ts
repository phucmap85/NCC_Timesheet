export const AbpUserConfiguration = {
    "multiTenancy": {
        "isEnabled": true,
        "sides": {
            "host": 2,
            "tenant": 1
        }
    },
    "session": {
        "userId": 0,
        "tenantId": null,
        "impersonatorUserId": null,
        "impersonatorTenantId": null,
        "multiTenancySide": 2
    },
    "localization": {
        "currentCulture": {
            "name": "en",
            "displayName": "English"
        },
        "languages": [
            {
                "name": "en",
                "displayName": "English",
                "icon": "famfamfam-flags gb",
                "isDefault": true,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "es-MX",
                "displayName": "Español México",
                "icon": "famfamfam-flags mx",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "fr",
                "displayName": "Français",
                "icon": "famfamfam-flags fr",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "de",
                "displayName": "German",
                "icon": "famfamfam-flags de",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "it",
                "displayName": "Italiano",
                "icon": "famfamfam-flags it",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "nl",
                "displayName": "Nederlands",
                "icon": "famfamfam-flags nl",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "pt-BR",
                "displayName": "Português",
                "icon": "famfamfam-flags br",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "tr",
                "displayName": "Türkçe",
                "icon": "famfamfam-flags tr",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "ru",
                "displayName": "Русский",
                "icon": "famfamfam-flags ru",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "ar",
                "displayName": "العربية",
                "icon": "famfamfam-flags sa",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": true
            },
            {
                "name": "ja",
                "displayName": "日本語",
                "icon": "famfamfam-flags jp",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            },
            {
                "name": "zh-Hans",
                "displayName": "简体中文",
                "icon": "famfamfam-flags cn",
                "isDefault": false,
                "isDisabled": false,
                "isRightToLeft": false
            }
        ],
        "currentLanguage": {
            "name": "en",
            "displayName": "English",
            "icon": "famfamfam-flags gb",
            "isDefault": true,
            "isDisabled": false,
            "isRightToLeft": false
        },
        "sources": [
            {
                "name": "Abp",
                "type": "MultiTenantLocalizationSource"
            },
            {
                "name": "AbpWeb",
                "type": "MultiTenantLocalizationSource"
            },
            {
                "name": "AbpZero",
                "type": "MultiTenantLocalizationSource"
            },
            {
                "name": "Timesheet",
                "type": "MultiTenantLocalizationSource"
            }
        ],
        "values": {
            "Abp": {
                "AllOfThesePermissionsMustBeGranted": "Required permissions are not granted. All of these permissions must be granted: {0}",
                "AtLeastOneOfThesePermissionsMustBeGranted": "Required permissions are not granted. At least one of these permissions must be granted: {0}",
                "CurrentUserDidNotLoginToTheApplication": "Current user did not login to the application!",
                "DefaultFromSenderDisplayName": "Default from (sender) display name",
                "DefaultFromSenderEmailAddress": "Default from (sender) email address",
                "DefaultLanguage": "Default language",
                "DomainName": "Domain name",
                "MainMenu": "Main menu",
                "Password": "Password",
                "ReceiveNotifications": "Receive notifications",
                "SmtpHost": "SMTP host",
                "SmtpPort": "SMTP port",
                "TimeZone": "Timezone",
                "UseDefaultCredentials": "Use default credentials",
                "Username": "User name",
                "UseSSL": "Use SSL"
            },
            "AbpWeb": {
                "AreYouSure": "Are you sure?",
                "Cancel": "Cancel",
                "DefaultError": "An error has occurred!",
                "DefaultError401": "You are not authenticated!",
                "DefaultError403": "You are not authorized!",
                "DefaultError404": "Resource not found!",
                "DefaultErrorDetail": "Error detail not sent by server.",
                "DefaultErrorDetail401": "You should be authenticated (sign in) in order to perform this operation.",
                "DefaultErrorDetail403": "You are not allowed to perform this operation.",
                "DefaultErrorDetail404": "The resource requested could not found on the server.",
                "EntityNotFound": "There is no entity {0} with id = {1}!",
                "InternalServerError": "An internal error occurred during your request!",
                "ValidationError": "Your request is not valid!",
                "ValidationNarrativeTitle": "The following errors were detected during validation.",
                "Yes": "Yes"
            },
            "AbpZero": {
                "CanNotDeleteAdminUser": "Can not delete user {0} since this is the default admin user!",
                "CanNotDeleteStaticRole": "Can not delete a static role: {0}",
                "CanNotRenameAdminUser": "Can not rename user name of the {0} since this is the default admin user!",
                "Email": "Email",
                "EmailSecurityCodeBody": "Your security code is: {0}",
                "EmailSecurityCodeSubject": "Security Code",
                "Identity.ConcurrencyFailure": "Optimistic concurrency failure, object has been modified.",
                "Identity.DefaultError": "An unknown failure has occurred.",
                "Identity.DuplicateEmail": "Email '{0}' is already taken.",
                "Identity.DuplicateRoleName": "Role name '{0}' is already taken.",
                "Identity.DuplicateUserName": "User name '{0}' is already taken.",
                "Identity.InvalidEmail": "Email '{0}' is invalid.",
                "Identity.InvalidPasswordHasherCompatibilityMode": "The provided PasswordHasherCompatibilityMode is invalid.",
                "Identity.InvalidPasswordHasherIterationCount": "The iteration count must be a positive integer.",
                "Identity.InvalidRoleName": "Role name '{0}' is invalid.",
                "Identity.InvalidToken": "Invalid token.",
                "Identity.InvalidUserName": "User name '{0}' is invalid, can only contain letters or digits.",
                "Identity.LoginAlreadyAssociated": "A user with this login already exists.",
                "Identity.PasswordMismatch": "Incorrect password.",
                "Identity.PasswordRequireDigit": "Passwords must have at least one digit ('0'-'9').",
                "Identity.PasswordRequireLower": "Passwords must have at least one lowercase ('a'-'z').",
                "Identity.PasswordRequireNonAlphanumeric": "Passwords must have at least one non alphanumeric character.",
                "Identity.PasswordRequireUpper": "Passwords must have at least one uppercase ('A'-'Z').",
                "Identity.PasswordTooShort": "Passwords must be at least {0} characters.",
                "Identity.RoleNotFound": "Role {0} does not exist.",
                "Identity.UserAlreadyHasPassword": "User already has a password set.",
                "Identity.UserAlreadyInRole": "User already in role '{0}'.",
                "Identity.UserLockedOut": "User is locked out.",
                "Identity.UserLockoutNotEnabled": "Lockout is not enabled for this user.",
                "Identity.UserNameNotFound": "User {0} does not exist.",
                "Identity.UserNotInRole": "User is not in role '{0}'.",
                "InvalidTenancyName": "Tenancy name is not valid!",
                "OrganizationUnitDuplicateDisplayNameWarning": "There is already an organization unit with name {0}. Two units with same name can not be created in same level.",
                "RoleDisplayNameIsAlreadyTaken": "Role display name {0} is already taken.",
                "RoleNameIsAlreadyTaken": "Role name {0} is already taken.",
                "Sms": "Sms",
                "SmsSecurityCodeMessage": "Your security code is: {0}",
                "TenancyNameIsAlreadyTaken": "Tenancy name {0} is already taken."
            },
            "Timesheet": {
                "About": "About",
                "Actions": "Actions",
                "AdminEmailAddress": "Admin email address",
                "Administration": "Administration",
                "AdminPassword": "Admin password",
                "AreYouSureWantToDelete": "Are you sure want to delete {0}?",
                "Back": "Back",
                "CanBeEmptyToLoginAsHost": "Can be empty to login as host.",
                "Cancel": "Cancel",
                "Change": "Change",
                "ChangeTenant": "Change tenant",
                "ClearAll": "Clear all",
                "ClearOthers": "Clear others",
                "ConfirmPassword": "Confirm password",
                "CouldNotCompleteLoginOperation": "Could not complete login operation. Please try again later.",
                "CouldNotValidateExternalUser": "Could not validate external user",
                "Create": "Create",
                "CreateNewRole": "Create new role",
                "CreateNewTenant": "Create new tenant",
                "CreateNewUser": "Create new user",
                "CurrentTenant": "Current tenant",
                "DatabaseConnectionString": "Database connection string",
                "DefaultPasswordIs": "Default password is {0}",
                "Delete": "Delete",
                "DisplayName": "Display Name",
                "Edit": "Edit",
                "EditRole": "Edit role",
                "EditTenant": "Edit tenant",
                "EditUser": "Edit user",
                "EmailAddress": "Email address",
                "Filter": "Filter",
                "FormIsNotValidMessage": "Form is not valid. Please check and fix errors.",
                "FullName": "Full name",
                "HomePage": "Home page",
                "InvalidUserNameOrPassword": "Invalid user name or password",
                "IsActive": "Is active",
                "LabelOptions": "Label options",
                "LeaveEmptyToSwitchToHost": "Leave empty to switch to the host",
                "LogIn": "Log in",
                "LoginFailed": "Login failed!",
                "Logout": "Logout",
                "MultiLevelMenu": "Multi Level Menu",
                "Name": "Name",
                "NameSurname": "Name surname",
                "No": "No",
                "NotSelected": "Not selected",
                "Off": "Off",
                "On": "On",
                "Optional": "Optional",
                "OrLoginWith": "Or login with",
                "Password": "Password",
                "Permissions": "Permissions",
                "PleaseEnterLoginInformation": "Please enter login information",
                "PleaseWait": "Please wait...",
                "Refresh": "Refresh",
                "Register": "Register",
                "RegisterFormUserNameInvalidMessage": "Please don't enter an email address for username.",
                "RememberMe": "Remember me",
                "ResetPassword": "Reset Password",
                "RoleDescription": "Role description",
                "RoleName": "Role Name",
                "Roles": "Roles",
                "Save": "Save",
                "SavedSuccessfully": "Saved successfully",
                "Settings": "Settings",
                "Skins": "Skins",
                "StartTyping": "Start Typing",
                "SuccessfullyRegistered": "Successfully registered",
                "Surname": "Surname",
                "TenancyName": "Tenancy name",
                "TenantIdIsNotActive{0}": "TenantId {0} is not active",
                "TenantIsNotActive": "Tenant {0} is not active.",
                "TenantName_Regex_Description": "Tenant name must be at least 2 chars, starts with a letter and continue with letter, number, dash or underscore.",
                "TenantNameCanNotBeEmpty": "Tenant name can not be empty",
                "Tenants": "Tenants",
                "TenantSelection": "Tenant Selection",
                "TenantSelection_Detail": "Please select one of the following tenants.",
                "ThereIsNoTenantDefinedWithName{0}": "There is no tenant defined with name {0}",
                "ThisFieldIsRequired": "This field is required",
                "UnknownTenantId{0}": "Unknown tenantId {0}",
                "UpdatePassword": "Update Password",
                "UserDetails": "User details",
                "UserEmailIsNotConfirmedAndCanNotLogin": "Your email address is not confirmed. You can not login.",
                "UserIsNotActiveAndCanNotLogin": "User {0} is not active and can not log in.",
                "UserLockedOutMessage": "The user account has been locked out. Please try again later.",
                "UserName": "User name",
                "UserNameOrEmail": "User name or email",
                "UserRoles": "User roles",
                "Users": "Users",
                "Version": "Version",
                "WaitingForActivationMessage": "Your account is waiting to be activated by system admin.",
                "WaitingForEmailActivation": "Your email address should be activated",
                "WelcomeMessage": "Welcome to Timesheet!",
                "Yes": "Yes"
            }
        }
    },
    "features": {
        "allFeatures": {}
    },
    "auth": {
        "allPermissions": {
            "Admin": "true",
            "Admin.Users": "true",
            "Admin.Users.View": "true",
            "Admin.Users.AddNew": "true",
            "Admin.Users.Edit": "true",
            "Admin.Users.EditRole": "true",
            "Admin.Users.Delete": "true",
            "Admin.Users.ResetPassword": "true",
            "Admin.Users.UploadAvatar": "true",
            "Admin.Users.ChangeStatus": "true",
            "Admin.Users.UploadWorkingTime": "true",
            "Admin.Users.UpdateUserWorkingTime": "true",
            "Admin.Users.ViewLevelUser": "true",
            "Admin.Users.ExportDataCheckpoint": "true",
            "Admin.Roles": "true",
            "Admin.Roles.View": "true",
            "Admin.Roles.ViewDetail": "true",
            "Admin.Roles.AddNew": "true",
            "Admin.Roles.Edit": "true",
            "Admin.Roles.Delete": "true",
            "Admin.Configuration": "true",
            "Admin.Configuration.Email": "true",
            "Admin.Configuration.Email.ViewEmail": "true",
            "Admin.Configuration.Email.EditEmail": "true",
            "Admin.Configuration.WorkingDay": "true",
            "Admin.Configuration.WorkingDay.ViewWorkingDay": "true",
            "Admin.Configuration.WorkingDay.EditWorkingDay": "true",
            "Admin.Configuration.GoogleSignOn": "true",
            "Admin.Configuration.GoogleSignOn.ViewGoogleSignOn": "true",
            "Admin.Configuration.GoogleSignOn.EditGoogleSignOn": "true",
            "Admin.Configuration.AutoLockTimesheet": "true",
            "Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet": "true",
            "Admin.Configuration.AutoLockTimesheet.EditAutoLockTimesheet": "true",
            "Admin.Configuration.SercurityCode": "true",
            "Admin.Configuration.SercurityCode.ViewSercurityCode": "true",
            "Admin.Configuration.SercurityCode.EditSercurityCode": "true",
            "Admin.Configuration.LogTimesheetInFuture": "true",
            "Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture": "true",
            "Admin.Configuration.LogTimesheetInFuture.EditLogTimesheetInFuture": "true",
            "Admin.Configuration.AutoSubmitTimesheet": "true",
            "Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet": "true",
            "Admin.Configuration.AutoSubmitTimesheet.EditAutoSubmitTimesheet": "true",
            "Admin.Configuration.CheckInSetting": "true",
            "Admin.Configuration.CheckInSetting.ViewCheckInSetting": "true",
            "Admin.Configuration.CheckInSetting.UpdateCheckInSetting": "true",
            "Admin.Configuration.HRMConfig": "true",
            "Admin.Configuration.HRMConfig.ViewHRMConfig": "true",
            "Admin.Configuration.HRMConfig.UpdateHRMConfig": "true",
            "Admin.Configuration.ProjectConfig": "true",
            "Admin.Configuration.ProjectConfig.ViewProjectConfig": "true",
            "Admin.Configuration.ProjectConfig.UpdateProjectConfig": "true",
            "Admin.Configuration.LevelSetting": "true",
            "Admin.Configuration.LevelSetting.ViewLevelSetting": "true",
            "Admin.Configuration.LevelSetting.EditLevelSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting.ViewCheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting.EditCheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.EmailSaoDo": "true",
            "Admin.Configuration.EmailSaoDo.ViewEmailSaoDo": "true",
            "Admin.Configuration.EmailSaoDo.EditEmailSaoDo": "true",
            "Admin.Configuration.RemoteSetting": "true",
            "Admin.Configuration.RemoteSetting.ViewRemoteSetting": "true",
            "Admin.Configuration.RemoteSetting.EditRemoteSetting": "true",
            "Admin.Configuration.KomuConfig": "true",
            "Admin.Configuration.KomuConfig.ViewKomuConfig": "true",
            "Admin.Configuration.KomuConfig.UpdateKomuConfig": "true",
            "Admin.Configuration.SpecialProjectTaskSetting": "true",
            "Admin.Configuration.SpecialProjectTaskSetting.ViewSpecialProjectTaskSetting": "true",
            "Admin.Configuration.SpecialProjectTaskSetting.EditSpecialProjectTaskSetting": "true",
            "Admin.Configuration.NotificationSetting": "true",
            "Admin.Configuration.NotificationSetting.ViewNotificationSetting": "true",
            "Admin.Configuration.NotificationSetting.EditNotificationSetting": "true",
            "Admin.Configuration.NRITConfig": "true",
            "Admin.Configuration.NRITConfig.ViewNRITConfig": "true",
            "Admin.Configuration.NRITConfig.UpdateNRITConfig": "true",
            "Admin.Configuration.UnlockTimesheetSetting": "true",
            "Admin.Configuration.UnlockTimesheetSetting.ViewUnlockTimesheetSetting": "true",
            "Admin.Configuration.UnlockTimesheetSetting.UpdateUnlockTimesheetSetting": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.View": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.Update": "true",
            "Admin.Configuration.RetroNotifyConfig": "true",
            "Admin.Configuration.RetroNotifyConfig.ViewRetroNotifyConfig": "true",
            "Admin.Configuration.RetroNotifyConfig.UpdateRetroNotifyConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig.ViewCreateNewRetroConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig.UpdateCreateNewRetroConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig.ViewGenerateRetroResultConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig.UpdateGenerateRetroResultConfig": "true",
            "Admin.Configuration.TeamBuilding": "true",
            "Admin.Configuration.TeamBuilding.ViewTeamBuildingConfig": "true",
            "Admin.Configuration.TeamBuilding.UpdateTeamBuildingConfig": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.ViewTimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.EditTimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.ViewTimeStartChangingCheckInToCheckOut": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.UpdateTimeStartChangingCheckInToCheckOut": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig.ViewApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig.UpdateApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig.ViewApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig.UpdateApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.ViewSendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.UpdateSendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.ViewNotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.UpdateNotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.ViewMoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.UpdateMoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig.ViewSendMessageToPunishUserConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig.UpdateSendMessageToPunishUserConfig": "true",
            "Admin.Clients": "true",
            "Admin.Clients.View": "true",
            "Admin.Clients.AddNew": "true",
            "Admin.Clients.Edit": "true",
            "Admin.Clients.Delete": "true",
            "Admin.Tasks": "true",
            "Admin.Tasks.View": "true",
            "Admin.Tasks.AddNew": "true",
            "Admin.Tasks.Edit": "true",
            "Admin.Tasks.Delete": "true",
            "Admin.Tasks.ChangeStatus": "true",
            "Admin.LeaveTypes": "true",
            "Admin.LeaveTypes.View": "true",
            "Admin.LeaveTypes.AddNew": "true",
            "Admin.LeaveTypes.Edit": "true",
            "Admin.LeaveTypes.Delete": "true",
            "Admin.Branchs": "true",
            "Admin.Branchs.View": "true",
            "Admin.Branchs.AddNew": "true",
            "Admin.Branchs.Edit": "true",
            "Admin.Branchs.Delete": "true",
            "Admin.Position": "true",
            "Admin.Position.View": "true",
            "Admin.Position.AddNew": "true",
            "Admin.Position.Edit": "true",
            "Admin.Position.Delete": "true",
            "Admin.Capability": "true",
            "Admin.Capability.View": "true",
            "Admin.Capability.AddNew": "true",
            "Admin.Capability.Edit": "true",
            "Admin.Capability.Delete": "true",
            "Admin.CapabilitySetting": "true",
            "Admin.CapabilitySetting.View": "true",
            "Admin.CapabilitySetting.AddNew": "true",
            "Admin.CapabilitySetting.Edit": "true",
            "Admin.CapabilitySetting.Delete": "true",
            "Admin.CapabilitySetting.Clone": "true",
            "Admin.AuditLog": "true",
            "Admin.AuditLog.View": "true",
            "DayOff": "true",
            "DayOff.View": "true",
            "DayOff.AddNew": "true",
            "DayOff.Edit": "true",
            "DayOff.Delete": "true",
            "OverTimeSetting": "true",
            "OverTimeSetting.View": "true",
            "OverTimeSetting.AddNew": "true",
            "OverTimeSetting.Edit": "true",
            "OverTimeSetting.Delete": "true",
            "Admin.BackgroundJob": "true",
            "Admin.BackgroundJob.View": "true",
            "Admin.BackgroundJob.Delete": "true",
            "Project": "true",
            "Project.View": "true",
            "Project.ViewAll": "true",
            "Project.AddNew": "true",
            "Project.Edit": "true",
            "Project.Delete": "true",
            "Project.ChangeStatus": "true",
            "Project.ViewDetail": "true",
            "Project.Export": "true",
            "Project.EditTeamWorkType": "true",
            "MyProfile": "true",
            "MyProfile.View": "true",
            "MyProfile.RequestUpdateInfo": "true",
            "MyTimesheet": "true",
            "MyTimesheet.View": "true",
            "MyTimesheet.AddNew": "true",
            "MyTimesheet.Edit": "true",
            "MyTimesheet.Delete": "true",
            "MyTimesheet.Submit": "true",
            "Timekeeping.UserNote": "true",
            "MyTimeSheet.ViewMyTardinessDetail": "true",
            "Project.UpdateDefaultProjectTask": "true",
            "MyAbsenceDay": "true",
            "MyAbsenceDay.View": "true",
            "MyAbsenceDay.SendRequest": "true",
            "MyAbsenceDay.CancelRequest": "true",
            "MyWorkingTime": "true",
            "MyWorkingTime.View": "true",
            "MyWorkingTime.RegistrationTime": "true",
            "MyWorkingTime.Edit": "true",
            "MyWorkingTime.Delete": "true",
            "Timesheet": "true",
            "Timesheet.View": "true",
            "Timesheet.ViewStatus": "true",
            "Timesheet.Approval": "true",
            "Timesheet.Export": "true",
            "AbsenceDayByProject": "true",
            "AbsenceDayByProject.View": "true",
            "AbsenceDayByProject.ViewByBranch": "true",
            "AbsenceDayByProject.Approval": "true",
            "AbsenceDayByProject.ViewDetail": "true",
            "ManageWorkingTime": "true",
            "ManageWorkingTime.ViewAll": "true",
            "ManageWorkingTime.ViewDetail": "true",
            "ManageWorkingTime.Approval": "true",
            "AbsenceDayOfTeam": "true",
            "AbsenceDayOfTeam.View": "true",
            "AbsenceDayOfTeam.ViewDetail": "true",
            "AbsenceDayOfTeam.NotifyPm": "true",
            "AbsenceDayOfTeam.ExportTeamWorkingCalender": "true",
            "TimesheetSupervision": "true",
            "TimesheetSupervision.View": "true",
            "Retro": "true",
            "Retro.View": "true",
            "Retro.AddNew": "true",
            "Retro.Edit": "true",
            "Retro.Delete": "true",
            "Retro.ChangeStatus": "true",
            "Retro.ManageRetro.RetroDetail": "true",
            "Retro.RetroDetail.ViewAllTeam": "true",
            "Retro.RetroDetail.ViewMyTeam": "true",
            "Retro.RetroDetail.AddEmployeeAllTeam": "true",
            "Retro.RetroDetail.AddEmployeeMyTeam": "true",
            "Retro.RetroDetail.Edit": "true",
            "Retro.RetroDetail.Delete": "true",
            "Retro.RetroDetail.DownloadTemplate": "true",
            "Retro.RetroDetail.Import": "true",
            "Retro.RetroDetail.Export": "true",
            "Retro.RetroDetail.GenerateData": "true",
            "Retro.RetroDetail.ViewLevel": "true",
            "ReviewIntern": "true",
            "ReviewIntern.ViewAllReport": "true",
            "ReviewIntern.ExportReport": "true",
            "ReviewIntern.AddNewReview": "true",
            "ReviewIntern.AddNewReviewByCapability": "true",
            "ReviewIntern.ViewAll": "true",
            "ReviewIntern.Delete": "true",
            "ReviewIntern.Active": "true",
            "ReviewIntern.DeActive": "true",
            "ReviewIntern.ReviewDetail": "true",
            "ReviewIntern.ReviewDetail.ViewAll": "true",
            "ReviewIntern.ReviewDetail.AddNew": "true",
            "ReviewIntern.ReviewDetail.Update": "true",
            "ReviewIntern.ReviewDetail.ChangeReviewer": "true",
            "ReviewIntern.ReviewDetail.Delete": "true",
            "ReviewIntern.ReviewDetail.ReviewForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ReviewByCapabilityForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ApproveForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ConfirmSalaryForOneIntern": "true",
            "ReviewIntern.ReviewDetail.RejectForOneIntern": "true",
            "ReviewIntern.ReviewDetail.SendEmailForOneIntern": "true",
            "ReviewIntern.ReviewDetail.RejectSentEmailForOneIntern": "true",
            "ReviewIntern.ReviewDetail.UpdateToHRMForOneIntern": "true",
            "ReviewIntern.ReviewDetail.SendAllEmailsIntern": "true",
            "ReviewIntern.ReviewDetail.SendAllEmailsOffical": "true",
            "ReviewIntern.ReviewDetail.UpdateStarToProject": "true",
            "ReviewIntern.ReviewDetail.SendAllToHRM": "true",
            "ReviewIntern.ApproveAll": "true",
            "ReviewIntern.ReviewDetail.ViewDetailLevel": "true",
            "ReviewIntern.ReviewDetail.ViewDetailSubLevel": "true",
            "ReviewIntern.ReviewDetail.ViewFullSalary": "true",
            "ReviewIntern.ReviewDetail.UpdateDetailSubLevel": "true",
            "ReviewIntern.ReviewDetail.UpdateDetailFullSalary": "true",
            "ReviewIntern.ReviewDetail.VerifyPmReviewedForOneIntern": "true",
            "ReviewIntern.ReviewDetail.AcceptHrRequestForOneIntern": "true",
            "ReviewIntern.ReviewDetail.CreatePMNote": "true",
            "ReviewIntern.ReviewDetail.CreatInterviewNote": "true",
            "ReviewIntern.ReviewDetail.AcceptPMReviewForAllIntern": "true",
            "Report": "true",
            "Report.InternsInfo": "true",
            "Report.InternsInfo.View": "true",
            "Report.InternsInfo.ViewLevelIntern": "true",
            "Report.NormalWorking": "true",
            "Report.NormalWorking.View": "true",
            "Report.NormalWorking.Export": "true",
            "Report.NormalWorking.LockUnlockTimesheet": "true",
            "Report.OverTime": "true",
            "Report.OverTime.View": "true",
            "Report.KomuTracker": "true",
            "Report.KomuTracker.View": "true",
            "Report.TardinessLeaveEarly": "true",
            "Report.TardinessLeaveEarly.View": "true",
            "Report.TardinessLeaveEarly.GetData": "true",
            "Report.TardinessLeaveEarly.ExportExcel": "true",
            "Report.TardinessLeaveEarly.Edit": "true",
            "Timekeeping.ReplyUserNote": "true",
            "TeamBuilding": "true",
            "TeamBuilding.DetailHR": "true",
            "TeamBuilding.DetailHR.ViewAllProject": "true",
            "TeamBuilding.DetailHR.GenerateData": "true",
            "TeamBuilding.DetailHR.Management": "true",
            "TeamBuilding.DetailPM": "true",
            "TeamBuilding.DetailPM.ViewMyProject": "true",
            "TeamBuilding.DetailPM.CreateRequest": "true",
            "TeamBuilding.Request": "true",
            "TeamBuilding.Request.ViewAllRequest": "true",
            "TeamBuilding.Request.ViewMyRequest": "true",
            "TeamBuilding.Request.DisburseRequest": "true",
            "TeamBuilding.Request.EditRequest": "true",
            "TeamBuilding.Request.ReOpenRequest": "true",
            "TeamBuilding.Request.RejectRequest": "true",
            "TeamBuilding.Request.CancelRequest": "true",
            "TeamBuilding.Request.ViewDetailRequest": "true",
            "TeamBuilding.Project": "true",
            "TeamBuilding.Project.SelectProjectTeamBuilding": "true",
            "ProjectManagementBranchDirectors": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewAllBranchs": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewMyBranch": "true",
            "ProjectManagementBranchDirectors.ManageUserProjectForBranchs": "true"
        },
        "grantedPermissions": {
            "Admin": "true",
            "Admin.Users": "true",
            "Admin.Users.View": "true",
            "Admin.Users.AddNew": "true",
            "Admin.Users.Edit": "true",
            "Admin.Users.EditRole": "true",
            "Admin.Users.Delete": "true",
            "Admin.Users.ResetPassword": "true",
            "Admin.Users.UploadAvatar": "true",
            "Admin.Users.ChangeStatus": "true",
            "Admin.Users.UploadWorkingTime": "true",
            "Admin.Users.UpdateUserWorkingTime": "true",
            "Admin.Users.ViewLevelUser": "true",
            "Admin.Users.ExportDataCheckpoint": "true",
            "Admin.Roles": "true",
            "Admin.Roles.View": "true",
            "Admin.Roles.ViewDetail": "true",
            "Admin.Roles.AddNew": "true",
            "Admin.Roles.Edit": "true",
            "Admin.Roles.Delete": "true",
            "Admin.Configuration": "true",
            "Admin.Configuration.Email": "true",
            "Admin.Configuration.Email.ViewEmail": "true",
            "Admin.Configuration.Email.EditEmail": "true",
            "Admin.Configuration.WorkingDay": "true",
            "Admin.Configuration.WorkingDay.ViewWorkingDay": "true",
            "Admin.Configuration.WorkingDay.EditWorkingDay": "true",
            "Admin.Configuration.GoogleSignOn": "true",
            "Admin.Configuration.GoogleSignOn.ViewGoogleSignOn": "true",
            "Admin.Configuration.GoogleSignOn.EditGoogleSignOn": "true",
            "Admin.Configuration.AutoLockTimesheet": "true",
            "Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet": "true",
            "Admin.Configuration.AutoLockTimesheet.EditAutoLockTimesheet": "true",
            "Admin.Configuration.SercurityCode": "true",
            "Admin.Configuration.SercurityCode.ViewSercurityCode": "true",
            "Admin.Configuration.SercurityCode.EditSercurityCode": "true",
            "Admin.Configuration.LogTimesheetInFuture": "true",
            "Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture": "true",
            "Admin.Configuration.LogTimesheetInFuture.EditLogTimesheetInFuture": "true",
            "Admin.Configuration.AutoSubmitTimesheet": "true",
            "Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet": "true",
            "Admin.Configuration.AutoSubmitTimesheet.EditAutoSubmitTimesheet": "true",
            "Admin.Configuration.CheckInSetting": "true",
            "Admin.Configuration.CheckInSetting.ViewCheckInSetting": "true",
            "Admin.Configuration.CheckInSetting.UpdateCheckInSetting": "true",
            "Admin.Configuration.HRMConfig": "true",
            "Admin.Configuration.HRMConfig.ViewHRMConfig": "true",
            "Admin.Configuration.HRMConfig.UpdateHRMConfig": "true",
            "Admin.Configuration.ProjectConfig": "true",
            "Admin.Configuration.ProjectConfig.ViewProjectConfig": "true",
            "Admin.Configuration.ProjectConfig.UpdateProjectConfig": "true",
            "Admin.Configuration.LevelSetting": "true",
            "Admin.Configuration.LevelSetting.ViewLevelSetting": "true",
            "Admin.Configuration.LevelSetting.EditLevelSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting.ViewCheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.CheckInCheckOutPunishmentSetting.EditCheckInCheckOutPunishmentSetting": "true",
            "Admin.Configuration.EmailSaoDo": "true",
            "Admin.Configuration.EmailSaoDo.ViewEmailSaoDo": "true",
            "Admin.Configuration.EmailSaoDo.EditEmailSaoDo": "true",
            "Admin.Configuration.RemoteSetting": "true",
            "Admin.Configuration.RemoteSetting.ViewRemoteSetting": "true",
            "Admin.Configuration.RemoteSetting.EditRemoteSetting": "true",
            "Admin.Configuration.KomuConfig": "true",
            "Admin.Configuration.KomuConfig.ViewKomuConfig": "true",
            "Admin.Configuration.KomuConfig.UpdateKomuConfig": "true",
            "Admin.Configuration.SpecialProjectTaskSetting": "true",
            "Admin.Configuration.SpecialProjectTaskSetting.ViewSpecialProjectTaskSetting": "true",
            "Admin.Configuration.SpecialProjectTaskSetting.EditSpecialProjectTaskSetting": "true",
            "Admin.Configuration.NotificationSetting": "true",
            "Admin.Configuration.NotificationSetting.ViewNotificationSetting": "true",
            "Admin.Configuration.NotificationSetting.EditNotificationSetting": "true",
            "Admin.Configuration.NRITConfig": "true",
            "Admin.Configuration.NRITConfig.ViewNRITConfig": "true",
            "Admin.Configuration.NRITConfig.UpdateNRITConfig": "true",
            "Admin.Configuration.UnlockTimesheetSetting": "true",
            "Admin.Configuration.UnlockTimesheetSetting.ViewUnlockTimesheetSetting": "true",
            "Admin.Configuration.UnlockTimesheetSetting.UpdateUnlockTimesheetSetting": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.View": "true",
            "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.Update": "true",
            "Admin.Configuration.RetroNotifyConfig": "true",
            "Admin.Configuration.RetroNotifyConfig.ViewRetroNotifyConfig": "true",
            "Admin.Configuration.RetroNotifyConfig.UpdateRetroNotifyConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig.ViewCreateNewRetroConfig": "true",
            "Admin.Configuration.CreateNewRetroConfig.UpdateCreateNewRetroConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig.ViewGenerateRetroResultConfig": "true",
            "Admin.Configuration.GenerateRetroResultConfig.UpdateGenerateRetroResultConfig": "true",
            "Admin.Configuration.TeamBuilding": "true",
            "Admin.Configuration.TeamBuilding.ViewTeamBuildingConfig": "true",
            "Admin.Configuration.TeamBuilding.UpdateTeamBuildingConfig": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.ViewTimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.EditTimesCanLateAndEarlyInMonthSetting": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.ViewTimeStartChangingCheckInToCheckOut": "true",
            "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.UpdateTimeStartChangingCheckInToCheckOut": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig.ViewApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveTimesheetNotifyConfig.UpdateApproveTimesheetNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig.ViewApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.ApproveRequestOffNotifyConfig.UpdateApproveRequestOffNotifyConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.ViewSendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.UpdateSendMessageRequestPendingTeamBuildingToHRConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.ViewNotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.UpdateNotifyHRTheEmployeeMayHaveLeftConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.ViewMoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.UpdateMoneyPMUnlockTimeSheetConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig.ViewSendMessageToPunishUserConfig": "true",
            "Admin.Configuration.SendMessageToPunishUserConfig.UpdateSendMessageToPunishUserConfig": "true",
            "Admin.Clients": "true",
            "Admin.Clients.View": "true",
            "Admin.Clients.AddNew": "true",
            "Admin.Clients.Edit": "true",
            "Admin.Clients.Delete": "true",
            "Admin.Tasks": "true",
            "Admin.Tasks.View": "true",
            "Admin.Tasks.AddNew": "true",
            "Admin.Tasks.Edit": "true",
            "Admin.Tasks.Delete": "true",
            "Admin.Tasks.ChangeStatus": "true",
            "Admin.LeaveTypes": "true",
            "Admin.LeaveTypes.View": "true",
            "Admin.LeaveTypes.AddNew": "true",
            "Admin.LeaveTypes.Edit": "true",
            "Admin.LeaveTypes.Delete": "true",
            "Admin.Branchs": "true",
            "Admin.Branchs.View": "true",
            "Admin.Branchs.AddNew": "true",
            "Admin.Branchs.Edit": "true",
            "Admin.Branchs.Delete": "true",
            "Admin.Position": "true",
            "Admin.Position.View": "true",
            "Admin.Position.AddNew": "true",
            "Admin.Position.Edit": "true",
            "Admin.Position.Delete": "true",
            "Admin.Capability": "true",
            "Admin.Capability.View": "true",
            "Admin.Capability.AddNew": "true",
            "Admin.Capability.Edit": "true",
            "Admin.Capability.Delete": "true",
            "Admin.CapabilitySetting": "true",
            "Admin.CapabilitySetting.View": "true",
            "Admin.CapabilitySetting.AddNew": "true",
            "Admin.CapabilitySetting.Edit": "true",
            "Admin.CapabilitySetting.Delete": "true",
            "Admin.CapabilitySetting.Clone": "true",
            "Admin.AuditLog": "true",
            "Admin.AuditLog.View": "true",
            "DayOff": "true",
            "DayOff.View": "true",
            "DayOff.AddNew": "true",
            "DayOff.Edit": "true",
            "DayOff.Delete": "true",
            "OverTimeSetting": "true",
            "OverTimeSetting.View": "true",
            "OverTimeSetting.AddNew": "true",
            "OverTimeSetting.Edit": "true",
            "OverTimeSetting.Delete": "true",
            "Admin.BackgroundJob": "true",
            "Admin.BackgroundJob.View": "true",
            "Admin.BackgroundJob.Delete": "true",
            "Project": "true",
            "Project.View": "true",
            "Project.ViewAll": "true",
            "Project.AddNew": "true",
            "Project.Edit": "true",
            "Project.Delete": "true",
            "Project.ChangeStatus": "true",
            "Project.ViewDetail": "true",
            "Project.Export": "true",
            "Project.EditTeamWorkType": "true",
            "MyProfile": "true",
            "MyProfile.View": "true",
            "MyProfile.RequestUpdateInfo": "true",
            "MyTimesheet": "true",
            "MyTimesheet.View": "true",
            "MyTimesheet.AddNew": "true",
            "MyTimesheet.Edit": "true",
            "MyTimesheet.Delete": "true",
            "MyTimesheet.Submit": "true",
            "Timekeeping.UserNote": "true",
            "MyTimeSheet.ViewMyTardinessDetail": "true",
            "Project.UpdateDefaultProjectTask": "true",
            "MyAbsenceDay": "true",
            "MyAbsenceDay.View": "true",
            "MyAbsenceDay.SendRequest": "true",
            "MyAbsenceDay.CancelRequest": "true",
            "MyWorkingTime": "true",
            "MyWorkingTime.View": "true",
            "MyWorkingTime.RegistrationTime": "true",
            "MyWorkingTime.Edit": "true",
            "MyWorkingTime.Delete": "true",
            "Timesheet": "true",
            "Timesheet.View": "true",
            "Timesheet.ViewStatus": "true",
            "Timesheet.Approval": "true",
            "Timesheet.Export": "true",
            "AbsenceDayByProject": "true",
            "AbsenceDayByProject.View": "true",
            "AbsenceDayByProject.ViewByBranch": "true",
            "AbsenceDayByProject.Approval": "true",
            "AbsenceDayByProject.ViewDetail": "true",
            "ManageWorkingTime": "true",
            "ManageWorkingTime.ViewAll": "true",
            "ManageWorkingTime.ViewDetail": "true",
            "ManageWorkingTime.Approval": "true",
            "AbsenceDayOfTeam": "true",
            "AbsenceDayOfTeam.View": "true",
            "AbsenceDayOfTeam.ViewDetail": "true",
            "AbsenceDayOfTeam.NotifyPm": "true",
            "AbsenceDayOfTeam.ExportTeamWorkingCalender": "true",
            "TimesheetSupervision": "true",
            "TimesheetSupervision.View": "true",
            "Retro": "true",
            "Retro.View": "true",
            "Retro.AddNew": "true",
            "Retro.Edit": "true",
            "Retro.Delete": "true",
            "Retro.ChangeStatus": "true",
            "Retro.ManageRetro.RetroDetail": "true",
            "Retro.RetroDetail.ViewAllTeam": "true",
            "Retro.RetroDetail.ViewMyTeam": "true",
            "Retro.RetroDetail.AddEmployeeAllTeam": "true",
            "Retro.RetroDetail.AddEmployeeMyTeam": "true",
            "Retro.RetroDetail.Edit": "true",
            "Retro.RetroDetail.Delete": "true",
            "Retro.RetroDetail.DownloadTemplate": "true",
            "Retro.RetroDetail.Import": "true",
            "Retro.RetroDetail.Export": "true",
            "Retro.RetroDetail.GenerateData": "true",
            "Retro.RetroDetail.ViewLevel": "true",
            "ReviewIntern": "true",
            "ReviewIntern.ViewAllReport": "true",
            "ReviewIntern.ExportReport": "true",
            "ReviewIntern.AddNewReview": "true",
            "ReviewIntern.AddNewReviewByCapability": "true",
            "ReviewIntern.ViewAll": "true",
            "ReviewIntern.Delete": "true",
            "ReviewIntern.Active": "true",
            "ReviewIntern.DeActive": "true",
            "ReviewIntern.ReviewDetail": "true",
            "ReviewIntern.ReviewDetail.ViewAll": "true",
            "ReviewIntern.ReviewDetail.AddNew": "true",
            "ReviewIntern.ReviewDetail.Update": "true",
            "ReviewIntern.ReviewDetail.ChangeReviewer": "true",
            "ReviewIntern.ReviewDetail.Delete": "true",
            "ReviewIntern.ReviewDetail.ReviewForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ReviewByCapabilityForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ApproveForOneIntern": "true",
            "ReviewIntern.ReviewDetail.ConfirmSalaryForOneIntern": "true",
            "ReviewIntern.ReviewDetail.RejectForOneIntern": "true",
            "ReviewIntern.ReviewDetail.SendEmailForOneIntern": "true",
            "ReviewIntern.ReviewDetail.RejectSentEmailForOneIntern": "true",
            "ReviewIntern.ReviewDetail.UpdateToHRMForOneIntern": "true",
            "ReviewIntern.ReviewDetail.SendAllEmailsIntern": "true",
            "ReviewIntern.ReviewDetail.SendAllEmailsOffical": "true",
            "ReviewIntern.ReviewDetail.UpdateStarToProject": "true",
            "ReviewIntern.ReviewDetail.SendAllToHRM": "true",
            "ReviewIntern.ApproveAll": "true",
            "ReviewIntern.ReviewDetail.ViewDetailLevel": "true",
            "ReviewIntern.ReviewDetail.ViewDetailSubLevel": "true",
            "ReviewIntern.ReviewDetail.ViewFullSalary": "true",
            "ReviewIntern.ReviewDetail.UpdateDetailSubLevel": "true",
            "ReviewIntern.ReviewDetail.UpdateDetailFullSalary": "true",
            "ReviewIntern.ReviewDetail.VerifyPmReviewedForOneIntern": "true",
            "ReviewIntern.ReviewDetail.AcceptHrRequestForOneIntern": "true",
            "ReviewIntern.ReviewDetail.CreatePMNote": "true",
            "ReviewIntern.ReviewDetail.CreatInterviewNote": "true",
            "ReviewIntern.ReviewDetail.AcceptPMReviewForAllIntern": "true",
            "Report": "true",
            "Report.InternsInfo": "true",
            "Report.InternsInfo.View": "true",
            "Report.InternsInfo.ViewLevelIntern": "true",
            "Report.NormalWorking": "true",
            "Report.NormalWorking.View": "true",
            "Report.NormalWorking.Export": "true",
            "Report.NormalWorking.LockUnlockTimesheet": "true",
            "Report.OverTime": "true",
            "Report.OverTime.View": "true",
            "Report.KomuTracker": "true",
            "Report.KomuTracker.View": "true",
            "Report.TardinessLeaveEarly": "true",
            "Report.TardinessLeaveEarly.View": "true",
            "Report.TardinessLeaveEarly.GetData": "true",
            "Report.TardinessLeaveEarly.ExportExcel": "true",
            "Report.TardinessLeaveEarly.Edit": "true",
            "Timekeeping.ReplyUserNote": "true",
            "TeamBuilding": "true",
            "TeamBuilding.DetailHR": "true",
            "TeamBuilding.DetailHR.ViewAllProject": "true",
            "TeamBuilding.DetailHR.GenerateData": "true",
            "TeamBuilding.DetailHR.Management": "true",
            "TeamBuilding.DetailPM": "true",
            "TeamBuilding.DetailPM.ViewMyProject": "true",
            "TeamBuilding.DetailPM.CreateRequest": "true",
            "TeamBuilding.Request": "true",
            "TeamBuilding.Request.ViewAllRequest": "true",
            "TeamBuilding.Request.ViewMyRequest": "true",
            "TeamBuilding.Request.DisburseRequest": "true",
            "TeamBuilding.Request.EditRequest": "true",
            "TeamBuilding.Request.ReOpenRequest": "true",
            "TeamBuilding.Request.RejectRequest": "true",
            "TeamBuilding.Request.CancelRequest": "true",
            "TeamBuilding.Request.ViewDetailRequest": "true",
            "TeamBuilding.Project": "true",
            "TeamBuilding.Project.SelectProjectTeamBuilding": "true",
            "ProjectManagementBranchDirectors": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewAllBranchs": "true",
            "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewMyBranch": "true",
            "ProjectManagementBranchDirectors.ManageUserProjectForBranchs": "true"
        },
    },
    "nav": {
        "menus": {
            "MainMenu": {
                "name": "MainMenu",
                "displayName": "Main menu",
                "customData": null,
                "items": []
            }
        }
    },
    "setting": {
        "values": {
            "Abp.Localization.DefaultLanguageName": "en-US",
            "Abp.Notifications.ReceiveNotifications": "true",
            "Abp.Timing.TimeZone": "UTC",
            "Abp.Zero.UserManagement.IsEmailConfirmationRequiredForLogin": "false",
            "Abp.Zero.OrganizationUnits.MaxUserMembershipCount": "2147483647",
            "Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled": "true",
            "Abp.Zero.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled": "true",
            "Abp.Zero.UserManagement.TwoFactorLogin.IsEmailProviderEnabled": "true",
            "Abp.Zero.UserManagement.TwoFactorLogin.IsSmsProviderEnabled": "true",
            "Abp.Zero.UserManagement.UserLockOut.IsEnabled": "true",
            "Abp.Zero.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout": "5",
            "Abp.Zero.UserManagement.UserLockOut.DefaultAccountLockoutSeconds": "300",
            "Abp.Zero.UserManagement.PasswordComplexity.RequireDigit": "false",
            "Abp.Zero.UserManagement.PasswordComplexity.RequireLowercase": "false",
            "Abp.Zero.UserManagement.PasswordComplexity.RequireNonAlphanumeric": "false",
            "Abp.Zero.UserManagement.PasswordComplexity.RequireUppercase": "false",
            "Abp.Zero.UserManagement.PasswordComplexity.RequiredLength": "3",
            "App.UiTheme": "red"
        }
    },
    "clock": {
        "provider": "localClockProvider"
    },
    "timing": {
        "timeZoneInfo": {
            "windows": {
                "timeZoneId": "UTC",
                "baseUtcOffsetInMilliseconds": 0,
                "currentUtcOffsetInMilliseconds": 0,
                "isDaylightSavingTimeNow": false
            },
            "iana": {
                "timeZoneId": "Etc/UTC"
            }
        }
    },
    "security": {
        "antiForgery": {
            "tokenCookieName": "XSRF-TOKEN",
            "tokenHeaderName": "X-XSRF-TOKEN"
        }
    },
    "custom": {}
};

export const allPermissionsWithConfig = [
    {
        "name": "Admin",
        "multiTenancySides": 2,
        "displayName": "Admin",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "Admin.Users",
                "multiTenancySides": 2,
                "displayName": "Users",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Users.View",
                        "multiTenancySides": 2,
                        "displayName": "View users",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.EditRole",
                        "multiTenancySides": 2,
                        "displayName": "Edit user role",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.ResetPassword",
                        "multiTenancySides": 2,
                        "displayName": "Reset password",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.UploadAvatar",
                        "multiTenancySides": 2,
                        "displayName": "Upload avatar",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.ChangeStatus",
                        "multiTenancySides": 2,
                        "displayName": "Change status user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.UploadWorkingTime",
                        "multiTenancySides": 2,
                        "displayName": "Import working time",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.UpdateUserWorkingTime",
                        "multiTenancySides": 2,
                        "displayName": "Update user's working time",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.ViewLevelUser",
                        "multiTenancySides": 2,
                        "displayName": "View level user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Users.ExportDataCheckpoint",
                        "multiTenancySides": 2,
                        "displayName": "Export Data For Checkpoint",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Roles",
                "multiTenancySides": 2,
                "displayName": "Roles",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Roles.View",
                        "multiTenancySides": 2,
                        "displayName": "View roles",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Roles.ViewDetail",
                        "multiTenancySides": 2,
                        "displayName": "View detail role",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Roles.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new role",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Roles.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit role",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Roles.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete role",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Configuration",
                "multiTenancySides": 2,
                "displayName": "Configuration",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Configuration.Email",
                        "multiTenancySides": 2,
                        "displayName": "Email Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.Email.ViewEmail",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.Email.EditEmail",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.WorkingDay",
                        "multiTenancySides": 2,
                        "displayName": " Working Time Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.WorkingDay.ViewWorkingDay",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.WorkingDay.EditWorkingDay",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.GoogleSignOn",
                        "multiTenancySides": 2,
                        "displayName": "Google Single Sign On Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.GoogleSignOn.ViewGoogleSignOn",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.GoogleSignOn.EditGoogleSignOn",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.AutoLockTimesheet",
                        "multiTenancySides": 2,
                        "displayName": "Auto Lock Timesheet Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.AutoLockTimesheet.EditAutoLockTimesheet",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.SercurityCode",
                        "multiTenancySides": 2,
                        "displayName": "Sercurity Code Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.SercurityCode.ViewSercurityCode",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.SercurityCode.EditSercurityCode",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.LogTimesheetInFuture",
                        "multiTenancySides": 2,
                        "displayName": "Log Timesheet Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.LogTimesheetInFuture.EditLogTimesheetInFuture",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.AutoSubmitTimesheet",
                        "multiTenancySides": 2,
                        "displayName": "Auto Submit Timesheet",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.AutoSubmitTimesheet.EditAutoSubmitTimesheet",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.CheckInSetting",
                        "multiTenancySides": 2,
                        "displayName": "CheckIn Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.CheckInSetting.ViewCheckInSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.CheckInSetting.UpdateCheckInSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.HRMConfig",
                        "multiTenancySides": 2,
                        "displayName": "HRM Config",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.HRMConfig.ViewHRMConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.HRMConfig.UpdateHRMConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.ProjectConfig",
                        "multiTenancySides": 2,
                        "displayName": "Project Config",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.ProjectConfig.ViewProjectConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.ProjectConfig.UpdateProjectConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.LevelSetting",
                        "multiTenancySides": 2,
                        "displayName": "Level setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.LevelSetting.ViewLevelSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.LevelSetting.EditLevelSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.CheckInCheckOutPunishmentSetting",
                        "multiTenancySides": 2,
                        "displayName": "Check in check out punishment setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.CheckInCheckOutPunishmentSetting.ViewCheckInCheckOutPunishmentSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.CheckInCheckOutPunishmentSetting.EditCheckInCheckOutPunishmentSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.EmailSaoDo",
                        "multiTenancySides": 2,
                        "displayName": "Email Sao Do Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.EmailSaoDo.ViewEmailSaoDo",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.EmailSaoDo.EditEmailSaoDo",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.RemoteSetting",
                        "multiTenancySides": 2,
                        "displayName": "Remote Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.RemoteSetting.ViewRemoteSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.RemoteSetting.EditRemoteSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.KomuConfig",
                        "multiTenancySides": 2,
                        "displayName": "Komu Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.KomuConfig.ViewKomuConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.KomuConfig.UpdateKomuConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.SpecialProjectTaskSetting",
                        "multiTenancySides": 2,
                        "displayName": "Special Project Task Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.SpecialProjectTaskSetting.ViewSpecialProjectTaskSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.SpecialProjectTaskSetting.EditSpecialProjectTaskSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.NotificationSetting",
                        "multiTenancySides": 2,
                        "displayName": "Notification Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.NotificationSetting.ViewNotificationSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.NotificationSetting.EditNotificationSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.NRITConfig",
                        "multiTenancySides": 2,
                        "displayName": "Notify Review Intern Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.NRITConfig.ViewNRITConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.NRITConfig.UpdateNRITConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.UnlockTimesheetSetting",
                        "multiTenancySides": 2,
                        "displayName": "Unlock Timesheet Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.UnlockTimesheetSetting.ViewUnlockTimesheetSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.UnlockTimesheetSetting.UpdateUnlockTimesheetSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut",
                        "multiTenancySides": 2,
                        "displayName": "Setting Worker Notice Komu Punishment User No Check In/Out",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.View",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.Update",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.RetroNotifyConfig",
                        "multiTenancySides": 2,
                        "displayName": "Notify Retro Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.RetroNotifyConfig.ViewRetroNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.RetroNotifyConfig.UpdateRetroNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.CreateNewRetroConfig",
                        "multiTenancySides": 2,
                        "displayName": "Add Retro Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.CreateNewRetroConfig.ViewCreateNewRetroConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.CreateNewRetroConfig.UpdateCreateNewRetroConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.GenerateRetroResultConfig",
                        "multiTenancySides": 2,
                        "displayName": "Retro result Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.GenerateRetroResultConfig.ViewGenerateRetroResultConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.GenerateRetroResultConfig.UpdateGenerateRetroResultConfig",
                                "multiTenancySides": 2,
                                "displayName": "Update",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.TeamBuilding",
                        "multiTenancySides": 2,
                        "displayName": "Team Building Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.TeamBuilding.ViewTeamBuildingConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.TeamBuilding.UpdateTeamBuildingConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting",
                        "multiTenancySides": 2,
                        "displayName": "Times Can Late And Early In Month Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.ViewTimesCanLateAndEarlyInMonthSetting",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.EditTimesCanLateAndEarlyInMonthSetting",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting",
                        "multiTenancySides": 2,
                        "displayName": "Time Start Changing Checkin To Checkout Setting",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.ViewTimeStartChangingCheckInToCheckOut",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.UpdateTimeStartChangingCheckInToCheckOut",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.ApproveTimesheetNotifyConfig",
                        "multiTenancySides": 2,
                        "displayName": "Setting Worker Notice Approve Timesheet",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.ApproveTimesheetNotifyConfig.ViewApproveTimesheetNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.ApproveTimesheetNotifyConfig.UpdateApproveTimesheetNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.ApproveRequestOffNotifyConfig",
                        "multiTenancySides": 2,
                        "displayName": "Setting Worker Notice Approve Request Off",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.ApproveRequestOffNotifyConfig.ViewApproveRequestOffNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.ApproveRequestOffNotifyConfig.UpdateApproveRequestOffNotifyConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig",
                        "multiTenancySides": 2,
                        "displayName": "Send Message Request Pending TeamBuilding To HR",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.ViewSendMessageRequestPendingTeamBuildingToHRConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.UpdateSendMessageRequestPendingTeamBuildingToHRConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig",
                        "multiTenancySides": 2,
                        "displayName": "Notify HR The Employee May Have Left",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.ViewNotifyHRTheEmployeeMayHaveLeftConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.UpdateNotifyHRTheEmployeeMayHaveLeftConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.MoneyPMUnlockTimeSheetConfig",
                        "multiTenancySides": 2,
                        "displayName": "Money PM Unlock TimeSheet",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.ViewMoneyPMUnlockTimeSheetConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.UpdateMoneyPMUnlockTimeSheetConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    },
                    {
                        "name": "Admin.Configuration.SendMessageToPunishUserConfig",
                        "multiTenancySides": 2,
                        "displayName": "Send Message To Punish User",
                        "isConfiguration": false,
                        "childrens": [
                            {
                                "name": "Admin.Configuration.SendMessageToPunishUserConfig.ViewSendMessageToPunishUserConfig",
                                "multiTenancySides": 2,
                                "displayName": "View",
                                "isConfiguration": false,
                                "childrens": null
                            },
                            {
                                "name": "Admin.Configuration.SendMessageToPunishUserConfig.UpdateSendMessageToPunishUserConfig",
                                "multiTenancySides": 2,
                                "displayName": "Edit",
                                "isConfiguration": false,
                                "childrens": null
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Admin.Clients",
                "multiTenancySides": 2,
                "displayName": "Clients",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Clients.View",
                        "multiTenancySides": 2,
                        "displayName": "View clients",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Clients.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new client",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Clients.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit client",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Clients.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete client",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Tasks",
                "multiTenancySides": 2,
                "displayName": "Tasks",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Tasks.View",
                        "multiTenancySides": 2,
                        "displayName": "View tasks",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Tasks.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new task",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Tasks.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit task",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Tasks.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete task",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Tasks.ChangeStatus",
                        "multiTenancySides": 2,
                        "displayName": "Change status task",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.LeaveTypes",
                "multiTenancySides": 2,
                "displayName": "Leave types",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.LeaveTypes.View",
                        "multiTenancySides": 2,
                        "displayName": "View leave types",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.LeaveTypes.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new leave type",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.LeaveTypes.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit leave type",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.LeaveTypes.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete leave type",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Branchs",
                "multiTenancySides": 2,
                "displayName": "Branchs",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Branchs.View",
                        "multiTenancySides": 2,
                        "displayName": "View branchs",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Branchs.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new branch",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Branchs.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit branch",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Branchs.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete branch",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Position",
                "multiTenancySides": 2,
                "displayName": "Position",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Position.View",
                        "multiTenancySides": 2,
                        "displayName": "View position",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Position.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new position",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Position.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit position",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Position.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete position",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.Capability",
                "multiTenancySides": 2,
                "displayName": "Capability",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.Capability.View",
                        "multiTenancySides": 2,
                        "displayName": "View capability",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Capability.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new capability",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Capability.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit capability",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.Capability.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete capability",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.CapabilitySetting",
                "multiTenancySides": 2,
                "displayName": "CapabilitySetting",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.CapabilitySetting.View",
                        "multiTenancySides": 2,
                        "displayName": "View capabilitySetting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.CapabilitySetting.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new capabilitySetting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.CapabilitySetting.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit capabilitySetting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.CapabilitySetting.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete capabilitySetting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.CapabilitySetting.Clone",
                        "multiTenancySides": 2,
                        "displayName": "Clone capabilitySetting",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.AuditLog",
                "multiTenancySides": 2,
                "displayName": "AuditLogs",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.AuditLog.View",
                        "multiTenancySides": 2,
                        "displayName": "View AuditLogs",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "DayOff",
                "multiTenancySides": 2,
                "displayName": "Setting off days",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "DayOff.View",
                        "multiTenancySides": 2,
                        "displayName": "View day offs",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "DayOff.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new day off",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "DayOff.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit day off",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "DayOff.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete day off",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "OverTimeSetting",
                "multiTenancySides": 2,
                "displayName": "Setting overtime",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "OverTimeSetting.View",
                        "multiTenancySides": 2,
                        "displayName": "View overtime settings",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "OverTimeSetting.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new overtime setting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "OverTimeSetting.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit overtime setting",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "OverTimeSetting.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete overtime setting",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Admin.BackgroundJob",
                "multiTenancySides": 3,
                "displayName": "Background Job",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Admin.BackgroundJob.View",
                        "multiTenancySides": 3,
                        "displayName": "View",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Admin.BackgroundJob.Delete",
                        "multiTenancySides": 3,
                        "displayName": "Delete",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            }
        ]
    },
    {
        "name": "Project",
        "multiTenancySides": 2,
        "displayName": "Projects",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "Project.View",
                "multiTenancySides": 2,
                "displayName": "View my projects",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.ViewAll",
                "multiTenancySides": 2,
                "displayName": "View all projects",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.AddNew",
                "multiTenancySides": 2,
                "displayName": "Add new project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.Edit",
                "multiTenancySides": 2,
                "displayName": "Edit project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.Delete",
                "multiTenancySides": 2,
                "displayName": "Delete project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.ChangeStatus",
                "multiTenancySides": 2,
                "displayName": "Change status of project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.ViewDetail",
                "multiTenancySides": 2,
                "displayName": "View detail of project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.Export",
                "multiTenancySides": 2,
                "displayName": "Export excel",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.EditTeamWorkType",
                "multiTenancySides": 2,
                "displayName": "Edit Team Work Type (Temp/Official)",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "MyProfile",
        "multiTenancySides": 2,
        "displayName": "My profile",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "MyProfile.View",
                "multiTenancySides": 2,
                "displayName": "View",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyProfile.RequestUpdateInfo",
                "multiTenancySides": 2,
                "displayName": "Request Update Info",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "MyTimesheet",
        "multiTenancySides": 2,
        "displayName": "My timesheets",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "MyTimesheet.View",
                "multiTenancySides": 2,
                "displayName": "View my timesheet by day/week",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyTimesheet.AddNew",
                "multiTenancySides": 2,
                "displayName": "Add new timesheet",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyTimesheet.Edit",
                "multiTenancySides": 2,
                "displayName": "Edit timesheet",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyTimesheet.Delete",
                "multiTenancySides": 2,
                "displayName": "Delete timesheet",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyTimesheet.Submit",
                "multiTenancySides": 2,
                "displayName": "Submit timesheet",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Timekeeping.UserNote",
                "multiTenancySides": 2,
                "displayName": "User khiếu lại đi muộn",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyTimeSheet.ViewMyTardinessDetail",
                "multiTenancySides": 2,
                "displayName": "View my tardiness detail",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Project.UpdateDefaultProjectTask",
                "multiTenancySides": 2,
                "displayName": "Set default project task",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "MyAbsenceDay",
        "multiTenancySides": 2,
        "displayName": "My request off/remote/onsite",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "MyAbsenceDay.View",
                "multiTenancySides": 2,
                "displayName": "View my off/remote/onsite requests",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyAbsenceDay.SendRequest",
                "multiTenancySides": 2,
                "displayName": "Send my leave/remote/onsite request",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyAbsenceDay.CancelRequest",
                "multiTenancySides": 2,
                "displayName": "Cancel my leave/remote/onsite request",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "MyWorkingTime",
        "multiTenancySides": 2,
        "displayName": "My working time",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "MyWorkingTime.View",
                "multiTenancySides": 2,
                "displayName": "View my working time",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyWorkingTime.RegistrationTime",
                "multiTenancySides": 2,
                "displayName": "Registration new working time",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyWorkingTime.Edit",
                "multiTenancySides": 2,
                "displayName": "Edit registration working time",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "MyWorkingTime.Delete",
                "multiTenancySides": 2,
                "displayName": "Delete registration working time",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "Timesheet",
        "multiTenancySides": 2,
        "displayName": "Manage timesheet",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "Timesheet.View",
                "multiTenancySides": 2,
                "displayName": "View timesheets",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Timesheet.ViewStatus",
                "multiTenancySides": 2,
                "displayName": "View status timesheets",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Timesheet.Approval",
                "multiTenancySides": 2,
                "displayName": "Approval timesheet",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Timesheet.Export",
                "multiTenancySides": 2,
                "displayName": "Export excel",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "AbsenceDayByProject",
        "multiTenancySides": 2,
        "displayName": "Manage request off/remote/onsite",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "AbsenceDayByProject.View",
                "multiTenancySides": 2,
                "displayName": "View users leave/remote/onsite by project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayByProject.ViewByBranch",
                "multiTenancySides": 2,
                "displayName": "View users leave/remote/onsite by branch",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayByProject.Approval",
                "multiTenancySides": 2,
                "displayName": "Approval requests",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayByProject.ViewDetail",
                "multiTenancySides": 2,
                "displayName": "View detail request",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "ManageWorkingTime",
        "multiTenancySides": 2,
        "displayName": "Manage working time",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "ManageWorkingTime.ViewAll",
                "multiTenancySides": 2,
                "displayName": "View all user working time ",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ManageWorkingTime.ViewDetail",
                "multiTenancySides": 2,
                "displayName": "View my team member Working Time",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ManageWorkingTime.Approval",
                "multiTenancySides": 2,
                "displayName": "Approval working time of member",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "AbsenceDayOfTeam",
        "multiTenancySides": 2,
        "displayName": "Team working calendar",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "AbsenceDayOfTeam.View",
                "multiTenancySides": 2,
                "displayName": "View your team member leave / onsite by project",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayOfTeam.ViewDetail",
                "multiTenancySides": 2,
                "displayName": "View detail leave / onsite of your team member",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayOfTeam.NotifyPm",
                "multiTenancySides": 2,
                "displayName": "Allow to push notify to PM",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "AbsenceDayOfTeam.ExportTeamWorkingCalender",
                "multiTenancySides": 2,
                "displayName": "Export team working calender",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "TimesheetSupervision",
        "multiTenancySides": 2,
        "displayName": "Timesheet mornitoring",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "TimesheetSupervision.View",
                "multiTenancySides": 2,
                "displayName": "View timesheets",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    },
    {
        "name": "Retro",
        "multiTenancySides": 2,
        "displayName": "Retro",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "Retro.View",
                "multiTenancySides": 2,
                "displayName": "View retro",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Retro.AddNew",
                "multiTenancySides": 2,
                "displayName": "Add new retro",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Retro.Edit",
                "multiTenancySides": 2,
                "displayName": "Edit retro",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Retro.Delete",
                "multiTenancySides": 2,
                "displayName": "Delete retro",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Retro.ChangeStatus",
                "multiTenancySides": 2,
                "displayName": "Change status retro",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "Retro.ManageRetro.RetroDetail",
                "multiTenancySides": 2,
                "displayName": "Retro detail",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Retro.RetroDetail.ViewAllTeam",
                        "multiTenancySides": 2,
                        "displayName": "View all team",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.ViewMyTeam",
                        "multiTenancySides": 2,
                        "displayName": "View my team",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.AddEmployeeAllTeam",
                        "multiTenancySides": 2,
                        "displayName": "Add employee all team",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.AddEmployeeMyTeam",
                        "multiTenancySides": 2,
                        "displayName": "Add employee my team",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit employee",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete employee",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.DownloadTemplate",
                        "multiTenancySides": 2,
                        "displayName": "Download template",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.Import",
                        "multiTenancySides": 2,
                        "displayName": "Import employee",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.Export",
                        "multiTenancySides": 2,
                        "displayName": "Export employee",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.GenerateData",
                        "multiTenancySides": 2,
                        "displayName": "Generate data employee",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Retro.RetroDetail.ViewLevel",
                        "multiTenancySides": 2,
                        "displayName": "View level",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            }
        ]
    },
    {
        "name": "ReviewIntern",
        "multiTenancySides": 2,
        "displayName": "Review Interns",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "ReviewIntern.ViewAllReport",
                "multiTenancySides": 2,
                "displayName": "View all report",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.ExportReport",
                "multiTenancySides": 2,
                "displayName": "Export report",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.AddNewReview",
                "multiTenancySides": 2,
                "displayName": "Create review phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.AddNewReviewByCapability",
                "multiTenancySides": 2,
                "displayName": "Create review by capability phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.ViewAll",
                "multiTenancySides": 2,
                "displayName": "View all review phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.Delete",
                "multiTenancySides": 2,
                "displayName": "Delete review phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.Active",
                "multiTenancySides": 2,
                "displayName": "Active review phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.DeActive",
                "multiTenancySides": 2,
                "displayName": "Deactive review phase",
                "isConfiguration": false,
                "childrens": null
            },
            {
                "name": "ReviewIntern.ReviewDetail",
                "multiTenancySides": 2,
                "displayName": "Review Detail",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "ReviewIntern.ReviewDetail.ViewAll",
                        "multiTenancySides": 2,
                        "displayName": "View all review detail",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.AddNew",
                        "multiTenancySides": 2,
                        "displayName": "Add new review detail",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.Update",
                        "multiTenancySides": 2,
                        "displayName": "Update review detail",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ChangeReviewer",
                        "multiTenancySides": 2,
                        "displayName": "Change reviewer review detail",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.Delete",
                        "multiTenancySides": 2,
                        "displayName": "Delete review detail",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ReviewForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Review (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ReviewByCapabilityForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Review by capability(for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ApproveForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Approve review (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ConfirmSalaryForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Chốt lương (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.RejectForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Reject review (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.SendEmailForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Send email (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.RejectSentEmailForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Reject sent mail (for one intern) by CEO",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.UpdateToHRMForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Update to hrm (for one intern)",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.SendAllEmailsIntern",
                        "multiTenancySides": 2,
                        "displayName": "Send all emails Intern",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.SendAllEmailsOffical",
                        "multiTenancySides": 2,
                        "displayName": "Send all emails Offical",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.UpdateStarToProject",
                        "multiTenancySides": 2,
                        "displayName": "Update star to Project",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.SendAllToHRM",
                        "multiTenancySides": 2,
                        "displayName": "Send to HRM",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ApproveAll",
                        "multiTenancySides": 2,
                        "displayName": "Approve all",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ViewDetailLevel",
                        "multiTenancySides": 2,
                        "displayName": "View Level",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ViewDetailSubLevel",
                        "multiTenancySides": 2,
                        "displayName": "View Sublevel",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.ViewFullSalary",
                        "multiTenancySides": 2,
                        "displayName": "View Full Salary",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.UpdateDetailSubLevel",
                        "multiTenancySides": 2,
                        "displayName": "Update Sublevel",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.UpdateDetailFullSalary",
                        "multiTenancySides": 2,
                        "displayName": "Update Full Lương",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.VerifyPmReviewedForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Verify PmReviewed For One Intern",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.AcceptHrRequestForOneIntern",
                        "multiTenancySides": 2,
                        "displayName": "Accept HrRequest For One Intern",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.CreatePMNote",
                        "multiTenancySides": 2,
                        "displayName": "Create PM note",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.CreatInterviewNote",
                        "multiTenancySides": 2,
                        "displayName": "Create Interview note",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ReviewIntern.ReviewDetail.AcceptPMReviewForAllIntern",
                        "multiTenancySides": 2,
                        "displayName": "Accept PmReviewed for all intern",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            }
        ]
    },
    {
        "name": "Report",
        "multiTenancySides": 2,
        "displayName": "Report",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "Report.InternsInfo",
                "multiTenancySides": 2,
                "displayName": "Interns info",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Report.InternsInfo.View",
                        "multiTenancySides": 2,
                        "displayName": "View interns info",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.InternsInfo.ViewLevelIntern",
                        "multiTenancySides": 2,
                        "displayName": "View level intern",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Report.NormalWorking",
                "multiTenancySides": 2,
                "displayName": "Normal working",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Report.NormalWorking.View",
                        "multiTenancySides": 2,
                        "displayName": "View normal working",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.NormalWorking.Export",
                        "multiTenancySides": 2,
                        "displayName": "Export excel",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.NormalWorking.LockUnlockTimesheet",
                        "multiTenancySides": 2,
                        "displayName": "Lock/unlock timesheet",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Report.OverTime",
                "multiTenancySides": 2,
                "displayName": "Over time",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Report.OverTime.View",
                        "multiTenancySides": 2,
                        "displayName": "View overtime",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Report.KomuTracker",
                "multiTenancySides": 2,
                "displayName": "Komu tracker",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Report.KomuTracker.View",
                        "multiTenancySides": 2,
                        "displayName": "View Komu tracker",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "Report.TardinessLeaveEarly",
                "multiTenancySides": 2,
                "displayName": "Tardisness / leave early",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "Report.TardinessLeaveEarly.View",
                        "multiTenancySides": 2,
                        "displayName": "View user tardiness or leave early",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.TardinessLeaveEarly.GetData",
                        "multiTenancySides": 2,
                        "displayName": "Get data from FaceID",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.TardinessLeaveEarly.ExportExcel",
                        "multiTenancySides": 2,
                        "displayName": "Export excel",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Report.TardinessLeaveEarly.Edit",
                        "multiTenancySides": 2,
                        "displayName": "Edit checkin, checkout time of user",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "Timekeeping.ReplyUserNote",
                        "multiTenancySides": 2,
                        "displayName": "Trả lời khiếu lại, chốt phạt user",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            }
        ]
    },
    {
        "name": "TeamBuilding",
        "multiTenancySides": 2,
        "displayName": "Team building",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "TeamBuilding.DetailHR",
                "multiTenancySides": 2,
                "displayName": "Team building detail HR",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "TeamBuilding.DetailHR.ViewAllProject",
                        "multiTenancySides": 2,
                        "displayName": "View all project",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.DetailHR.GenerateData",
                        "multiTenancySides": 2,
                        "displayName": "Generate data",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.DetailHR.Management",
                        "multiTenancySides": 2,
                        "displayName": "Management",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "TeamBuilding.DetailPM",
                "multiTenancySides": 2,
                "displayName": "Team building detail PM",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "TeamBuilding.DetailPM.ViewMyProject",
                        "multiTenancySides": 2,
                        "displayName": "View my project",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.DetailPM.CreateRequest",
                        "multiTenancySides": 2,
                        "displayName": "Create request money",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "TeamBuilding.Request",
                "multiTenancySides": 2,
                "displayName": "Team building request",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "TeamBuilding.Request.ViewAllRequest",
                        "multiTenancySides": 2,
                        "displayName": "View all request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.ViewMyRequest",
                        "multiTenancySides": 2,
                        "displayName": "View my request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.DisburseRequest",
                        "multiTenancySides": 2,
                        "displayName": "Disburse request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.EditRequest",
                        "multiTenancySides": 2,
                        "displayName": "Edit request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.ReOpenRequest",
                        "multiTenancySides": 2,
                        "displayName": "Re-open request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.RejectRequest",
                        "multiTenancySides": 2,
                        "displayName": "Reject request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.CancelRequest",
                        "multiTenancySides": 2,
                        "displayName": "Cancel request",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "TeamBuilding.Request.ViewDetailRequest",
                        "multiTenancySides": 2,
                        "displayName": "View detail request",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "TeamBuilding.Project",
                "multiTenancySides": 2,
                "displayName": "Team building project",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "TeamBuilding.Project.SelectProjectTeamBuilding",
                        "multiTenancySides": 2,
                        "displayName": "Select project team building",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            }
        ]
    },
    {
        "name": "ProjectManagementBranchDirectors",
        "multiTenancySides": 2,
        "displayName": "Project Management For Branch Directors",
        "isConfiguration": false,
        "childrens": [
            {
                "name": "ProjectManagementBranchDirectors.ManageUserForBranchs",
                "multiTenancySides": 2,
                "displayName": "Manage User For Branchs",
                "isConfiguration": false,
                "childrens": [
                    {
                        "name": "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewAllBranchs",
                        "multiTenancySides": 2,
                        "displayName": "View User from all branchs",
                        "isConfiguration": false,
                        "childrens": null
                    },
                    {
                        "name": "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewMyBranch",
                        "multiTenancySides": 2,
                        "displayName": "View User from my branch",
                        "isConfiguration": false,
                        "childrens": null
                    }
                ]
            },
            {
                "name": "ProjectManagementBranchDirectors.ManageUserProjectForBranchs",
                "multiTenancySides": 2,
                "displayName": "Manage User Project For Branchs",
                "isConfiguration": false,
                "childrens": null
            }
        ]
    }
];

export const allPermissionsName = [
    "Admin",
    "Admin.Users",
    "Admin.Users.View",
    "Admin.Users.AddNew",
    "Admin.Users.Edit",
    "Admin.Users.EditRole",
    "Admin.Users.Delete",
    "Admin.Users.ResetPassword",
    "Admin.Users.UploadAvatar",
    "Admin.Users.ChangeStatus",
    "Admin.Users.UploadWorkingTime",
    "Admin.Users.UpdateUserWorkingTime",
    "Admin.Users.ViewLevelUser",
    "Admin.Users.ExportDataCheckpoint",
    "Admin.Roles",
    "Admin.Roles.View",
    "Admin.Roles.ViewDetail",
    "Admin.Roles.AddNew",
    "Admin.Roles.Edit",
    "Admin.Roles.Delete",
    "Admin.Configuration",
    "Admin.Configuration.Email",
    "Admin.Configuration.Email.ViewEmail",
    "Admin.Configuration.Email.EditEmail",
    "Admin.Configuration.WorkingDay",
    "Admin.Configuration.WorkingDay.ViewWorkingDay",
    "Admin.Configuration.WorkingDay.EditWorkingDay",
    "Admin.Configuration.GoogleSignOn",
    "Admin.Configuration.GoogleSignOn.ViewGoogleSignOn",
    "Admin.Configuration.GoogleSignOn.EditGoogleSignOn",
    "Admin.Configuration.AutoLockTimesheet",
    "Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet",
    "Admin.Configuration.AutoLockTimesheet.EditAutoLockTimesheet",
    "Admin.Configuration.SercurityCode",
    "Admin.Configuration.SercurityCode.ViewSercurityCode",
    "Admin.Configuration.SercurityCode.EditSercurityCode",
    "Admin.Configuration.LogTimesheetInFuture",
    "Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture",
    "Admin.Configuration.LogTimesheetInFuture.EditLogTimesheetInFuture",
    "Admin.Configuration.AutoSubmitTimesheet",
    "Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet",
    "Admin.Configuration.AutoSubmitTimesheet.EditAutoSubmitTimesheet",
    "Admin.Configuration.CheckInSetting",
    "Admin.Configuration.CheckInSetting.ViewCheckInSetting",
    "Admin.Configuration.CheckInSetting.UpdateCheckInSetting",
    "Admin.Configuration.HRMConfig",
    "Admin.Configuration.HRMConfig.ViewHRMConfig",
    "Admin.Configuration.HRMConfig.UpdateHRMConfig",
    "Admin.Configuration.ProjectConfig",
    "Admin.Configuration.ProjectConfig.ViewProjectConfig",
    "Admin.Configuration.ProjectConfig.UpdateProjectConfig",
    "Admin.Configuration.LevelSetting",
    "Admin.Configuration.LevelSetting.ViewLevelSetting",
    "Admin.Configuration.LevelSetting.EditLevelSetting",
    "Admin.Configuration.CheckInCheckOutPunishmentSetting",
    "Admin.Configuration.CheckInCheckOutPunishmentSetting.ViewCheckInCheckOutPunishmentSetting",
    "Admin.Configuration.CheckInCheckOutPunishmentSetting.EditCheckInCheckOutPunishmentSetting",
    "Admin.Configuration.EmailSaoDo",
    "Admin.Configuration.EmailSaoDo.ViewEmailSaoDo",
    "Admin.Configuration.EmailSaoDo.EditEmailSaoDo",
    "Admin.Configuration.RemoteSetting",
    "Admin.Configuration.RemoteSetting.ViewRemoteSetting",
    "Admin.Configuration.RemoteSetting.EditRemoteSetting",
    "Admin.Configuration.KomuConfig",
    "Admin.Configuration.KomuConfig.ViewKomuConfig",
    "Admin.Configuration.KomuConfig.UpdateKomuConfig",
    "Admin.Configuration.SpecialProjectTaskSetting",
    "Admin.Configuration.SpecialProjectTaskSetting.ViewSpecialProjectTaskSetting",
    "Admin.Configuration.SpecialProjectTaskSetting.EditSpecialProjectTaskSetting",
    "Admin.Configuration.NotificationSetting",
    "Admin.Configuration.NotificationSetting.ViewNotificationSetting",
    "Admin.Configuration.NotificationSetting.EditNotificationSetting",
    "Admin.Configuration.NRITConfig",
    "Admin.Configuration.NRITConfig.ViewNRITConfig",
    "Admin.Configuration.NRITConfig.UpdateNRITConfig",
    "Admin.Configuration.UnlockTimesheetSetting",
    "Admin.Configuration.UnlockTimesheetSetting.ViewUnlockTimesheetSetting",
    "Admin.Configuration.UnlockTimesheetSetting.UpdateUnlockTimesheetSetting",
    "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut",
    "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.View",
    "Admin.Configuration.SettingWorkerNoticeKomuPunishmentUserNoCheckInOut.Update",
    "Admin.Configuration.RetroNotifyConfig",
    "Admin.Configuration.RetroNotifyConfig.ViewRetroNotifyConfig",
    "Admin.Configuration.RetroNotifyConfig.UpdateRetroNotifyConfig",
    "Admin.Configuration.CreateNewRetroConfig",
    "Admin.Configuration.CreateNewRetroConfig.ViewCreateNewRetroConfig",
    "Admin.Configuration.CreateNewRetroConfig.UpdateCreateNewRetroConfig",
    "Admin.Configuration.GenerateRetroResultConfig",
    "Admin.Configuration.GenerateRetroResultConfig.ViewGenerateRetroResultConfig",
    "Admin.Configuration.GenerateRetroResultConfig.UpdateGenerateRetroResultConfig",
    "Admin.Configuration.TeamBuilding",
    "Admin.Configuration.TeamBuilding.ViewTeamBuildingConfig",
    "Admin.Configuration.TeamBuilding.UpdateTeamBuildingConfig",
    "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting",
    "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.ViewTimesCanLateAndEarlyInMonthSetting",
    "Admin.Configuration.TimesCanLateAndEarlyInMonthSetting.EditTimesCanLateAndEarlyInMonthSetting",
    "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting",
    "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.ViewTimeStartChangingCheckInToCheckOut",
    "Admin.Configuration.TimeStartChangingCheckInToCheckOutSetting.UpdateTimeStartChangingCheckInToCheckOut",
    "Admin.Configuration.ApproveTimesheetNotifyConfig",
    "Admin.Configuration.ApproveTimesheetNotifyConfig.ViewApproveTimesheetNotifyConfig",
    "Admin.Configuration.ApproveTimesheetNotifyConfig.UpdateApproveTimesheetNotifyConfig",
    "Admin.Configuration.ApproveRequestOffNotifyConfig",
    "Admin.Configuration.ApproveRequestOffNotifyConfig.ViewApproveRequestOffNotifyConfig",
    "Admin.Configuration.ApproveRequestOffNotifyConfig.UpdateApproveRequestOffNotifyConfig",
    "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig",
    "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.ViewSendMessageRequestPendingTeamBuildingToHRConfig",
    "Admin.Configuration.SendMessageRequestPendingTeamBuildingToHRConfig.UpdateSendMessageRequestPendingTeamBuildingToHRConfig",
    "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig",
    "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.ViewNotifyHRTheEmployeeMayHaveLeftConfig",
    "Admin.Configuration.NotifyHRTheEmployeeMayHaveLeftConfig.UpdateNotifyHRTheEmployeeMayHaveLeftConfig",
    "Admin.Configuration.MoneyPMUnlockTimeSheetConfig",
    "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.ViewMoneyPMUnlockTimeSheetConfig",
    "Admin.Configuration.MoneyPMUnlockTimeSheetConfig.UpdateMoneyPMUnlockTimeSheetConfig",
    "Admin.Configuration.SendMessageToPunishUserConfig",
    "Admin.Configuration.SendMessageToPunishUserConfig.ViewSendMessageToPunishUserConfig",
    "Admin.Configuration.SendMessageToPunishUserConfig.UpdateSendMessageToPunishUserConfig",
    "Admin.Clients",
    "Admin.Clients.View",
    "Admin.Clients.AddNew",
    "Admin.Clients.Edit",
    "Admin.Clients.Delete",
    "Admin.Tasks",
    "Admin.Tasks.View",
    "Admin.Tasks.AddNew",
    "Admin.Tasks.Edit",
    "Admin.Tasks.Delete",
    "Admin.Tasks.ChangeStatus",
    "Admin.LeaveTypes",
    "Admin.LeaveTypes.View",
    "Admin.LeaveTypes.AddNew",
    "Admin.LeaveTypes.Edit",
    "Admin.LeaveTypes.Delete",
    "Admin.Branchs",
    "Admin.Branchs.View",
    "Admin.Branchs.AddNew",
    "Admin.Branchs.Edit",
    "Admin.Branchs.Delete",
    "Admin.Position",
    "Admin.Position.View",
    "Admin.Position.AddNew",
    "Admin.Position.Edit",
    "Admin.Position.Delete",
    "Admin.Capability",
    "Admin.Capability.View",
    "Admin.Capability.AddNew",
    "Admin.Capability.Edit",
    "Admin.Capability.Delete",
    "Admin.CapabilitySetting",
    "Admin.CapabilitySetting.View",
    "Admin.CapabilitySetting.AddNew",
    "Admin.CapabilitySetting.Edit",
    "Admin.CapabilitySetting.Delete",
    "Admin.CapabilitySetting.Clone",
    "Admin.AuditLog",
    "Admin.AuditLog.View",
    "DayOff",
    "DayOff.View",
    "DayOff.AddNew",
    "DayOff.Edit",
    "DayOff.Delete",
    "OverTimeSetting",
    "OverTimeSetting.View",
    "OverTimeSetting.AddNew",
    "OverTimeSetting.Edit",
    "OverTimeSetting.Delete",
    "Admin.BackgroundJob",
    "Admin.BackgroundJob.View",
    "Admin.BackgroundJob.Delete",
    "Project",
    "Project.View",
    "Project.ViewAll",
    "Project.AddNew",
    "Project.Edit",
    "Project.Delete",
    "Project.ChangeStatus",
    "Project.ViewDetail",
    "Project.Export",
    "Project.EditTeamWorkType",
    "MyProfile",
    "MyProfile.View",
    "MyProfile.RequestUpdateInfo",
    "MyTimesheet",
    "MyTimesheet.View",
    "MyTimesheet.AddNew",
    "MyTimesheet.Edit",
    "MyTimesheet.Delete",
    "MyTimesheet.Submit",
    "Timekeeping.UserNote",
    "MyTimeSheet.ViewMyTardinessDetail",
    "Project.UpdateDefaultProjectTask",
    "MyAbsenceDay",
    "MyAbsenceDay.View",
    "MyAbsenceDay.SendRequest",
    "MyAbsenceDay.CancelRequest",
    "MyWorkingTime",
    "MyWorkingTime.View",
    "MyWorkingTime.RegistrationTime",
    "MyWorkingTime.Edit",
    "MyWorkingTime.Delete",
    "Timesheet",
    "Timesheet.View",
    "Timesheet.ViewStatus",
    "Timesheet.Approval",
    "Timesheet.Export",
    "AbsenceDayByProject",
    "AbsenceDayByProject.View",
    "AbsenceDayByProject.ViewByBranch",
    "AbsenceDayByProject.Approval",
    "AbsenceDayByProject.ViewDetail",
    "ManageWorkingTime",
    "ManageWorkingTime.ViewAll",
    "ManageWorkingTime.ViewDetail",
    "ManageWorkingTime.Approval",
    "AbsenceDayOfTeam",
    "AbsenceDayOfTeam.View",
    "AbsenceDayOfTeam.ViewDetail",
    "AbsenceDayOfTeam.NotifyPm",
    "AbsenceDayOfTeam.ExportTeamWorkingCalender",
    "TimesheetSupervision",
    "TimesheetSupervision.View",
    "Retro",
    "Retro.View",
    "Retro.AddNew",
    "Retro.Edit",
    "Retro.Delete",
    "Retro.ChangeStatus",
    "Retro.ManageRetro.RetroDetail",
    "Retro.RetroDetail.ViewAllTeam",
    "Retro.RetroDetail.ViewMyTeam",
    "Retro.RetroDetail.AddEmployeeAllTeam",
    "Retro.RetroDetail.AddEmployeeMyTeam",
    "Retro.RetroDetail.Edit",
    "Retro.RetroDetail.Delete",
    "Retro.RetroDetail.DownloadTemplate",
    "Retro.RetroDetail.Import",
    "Retro.RetroDetail.Export",
    "Retro.RetroDetail.GenerateData",
    "Retro.RetroDetail.ViewLevel",
    "ReviewIntern",
    "ReviewIntern.ViewAllReport",
    "ReviewIntern.ExportReport",
    "ReviewIntern.AddNewReview",
    "ReviewIntern.AddNewReviewByCapability",
    "ReviewIntern.ViewAll",
    "ReviewIntern.Delete",
    "ReviewIntern.Active",
    "ReviewIntern.DeActive",
    "ReviewIntern.ReviewDetail",
    "ReviewIntern.ReviewDetail.ViewAll",
    "ReviewIntern.ReviewDetail.AddNew",
    "ReviewIntern.ReviewDetail.Update",
    "ReviewIntern.ReviewDetail.ChangeReviewer",
    "ReviewIntern.ReviewDetail.Delete",
    "ReviewIntern.ReviewDetail.ReviewForOneIntern",
    "ReviewIntern.ReviewDetail.ReviewByCapabilityForOneIntern",
    "ReviewIntern.ReviewDetail.ApproveForOneIntern",
    "ReviewIntern.ReviewDetail.ConfirmSalaryForOneIntern",
    "ReviewIntern.ReviewDetail.RejectForOneIntern",
    "ReviewIntern.ReviewDetail.SendEmailForOneIntern",
    "ReviewIntern.ReviewDetail.RejectSentEmailForOneIntern",
    "ReviewIntern.ReviewDetail.UpdateToHRMForOneIntern",
    "ReviewIntern.ReviewDetail.SendAllEmailsIntern",
    "ReviewIntern.ReviewDetail.SendAllEmailsOffical",
    "ReviewIntern.ReviewDetail.UpdateStarToProject",
    "ReviewIntern.ReviewDetail.SendAllToHRM",
    "ReviewIntern.ApproveAll",
    "ReviewIntern.ReviewDetail.ViewDetailLevel",
    "ReviewIntern.ReviewDetail.ViewDetailSubLevel",
    "ReviewIntern.ReviewDetail.ViewFullSalary",
    "ReviewIntern.ReviewDetail.UpdateDetailSubLevel",
    "ReviewIntern.ReviewDetail.UpdateDetailFullSalary",
    "ReviewIntern.ReviewDetail.VerifyPmReviewedForOneIntern",
    "ReviewIntern.ReviewDetail.AcceptHrRequestForOneIntern",
    "ReviewIntern.ReviewDetail.CreatePMNote",
    "ReviewIntern.ReviewDetail.CreatInterviewNote",
    "ReviewIntern.ReviewDetail.AcceptPMReviewForAllIntern",
    "Report",
    "Report.InternsInfo",
    "Report.InternsInfo.View",
    "Report.InternsInfo.ViewLevelIntern",
    "Report.NormalWorking",
    "Report.NormalWorking.View",
    "Report.NormalWorking.Export",
    "Report.NormalWorking.LockUnlockTimesheet",
    "Report.OverTime",
    "Report.OverTime.View",
    "Report.KomuTracker",
    "Report.KomuTracker.View",
    "Report.TardinessLeaveEarly",
    "Report.TardinessLeaveEarly.View",
    "Report.TardinessLeaveEarly.GetData",
    "Report.TardinessLeaveEarly.ExportExcel",
    "Report.TardinessLeaveEarly.Edit",
    "Timekeeping.ReplyUserNote",
    "TeamBuilding",
    "TeamBuilding.DetailHR",
    "TeamBuilding.DetailHR.ViewAllProject",
    "TeamBuilding.DetailHR.GenerateData",
    "TeamBuilding.DetailHR.Management",
    "TeamBuilding.DetailPM",
    "TeamBuilding.DetailPM.ViewMyProject",
    "TeamBuilding.DetailPM.CreateRequest",
    "TeamBuilding.Request",
    "TeamBuilding.Request.ViewAllRequest",
    "TeamBuilding.Request.ViewMyRequest",
    "TeamBuilding.Request.DisburseRequest",
    "TeamBuilding.Request.EditRequest",
    "TeamBuilding.Request.ReOpenRequest",
    "TeamBuilding.Request.RejectRequest",
    "TeamBuilding.Request.CancelRequest",
    "TeamBuilding.Request.ViewDetailRequest",
    "TeamBuilding.Project",
    "TeamBuilding.Project.SelectProjectTeamBuilding",
    "ProjectManagementBranchDirectors",
    "ProjectManagementBranchDirectors.ManageUserForBranchs",
    "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewAllBranchs",
    "ProjectManagementBranchDirectors.ManageUserForBranchs.ViewMyBranch",
    "ProjectManagementBranchDirectors.ManageUserProjectForBranchs"
];