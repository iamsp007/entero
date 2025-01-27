<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ScheduleDemoRequest;
use App\Services\Notification;

class IndexController extends Controller
{
    public function index()
    {
        return view('landing.index');
    }

    public function new_timesheet()
    {
        return view('timesheet.new_timesheet');
    }

    public function scheduleDemo(Request $request)
    {
        $message = '';
        $success = false;
        $post_data = $request->all();

        $res_id = ScheduleDemoRequest::create($post_data)->id;
        // Send Email To HCBS Team---Start
        $array['subject'] = "New Schedule Demo Request";
        $array['fromName'] = $request->full_name;
        $array['toEmail'] = "contact@hcbspro.com";
        $array['body'] = "<h3>New Schedule Demo Request details : </h3>\n"
                . "Company Name : ".$request->company_name."<br/>"
                . "Full Name : ".$request->full_name."<br/>"
                . "Phone : ".$request->phone."<br/>"
                . "Email : ".$request->email."<br/>"
                . "Bast Time For Talk : ".$request->besttime;
        $array['page'] = 'emails.timesheetMail';
        emailSendByPHPMailer($array);
        // Send Email To HCBS Team---End

        if( $res_id ){
            $message = "Request has been send successful.";
            $success = true;

            $emailData = [
                'company_id' => '1'
            ];

            $emailTemplate = getEmailTemplate('schedule_demo_request', $emailData);
            $details = [
                'full_name' => $request->full_name,
                'email' => $request->email,
                'emailTemplate' => $emailTemplate,
                'page' => 'emails.landing.schedule-demo',
                'type' => '9',
                'user_id' => $request->id,
            ];

            Notification::email($details);
        }

        $return = [
            'success' => $success,
            'message' => $message,
            'data' => $post_data
        ];
        return response()->json($return, 200);
    }
}
