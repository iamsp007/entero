<?php
namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        if (hasRole(['Coordinator'])):
            return view('timesheet.dashboard');
        elseif (hasRole(['super-admin'])):
            return view('super_admin_dashboard');
        else:
            $progressGreaterThan50 = User::where(['company_id' => authCompanyId(), 'status' => '1'])->whereHas('roles',function ($q) {
                $q->where('name','patient');
            })->whereHas('patientDetails',function ($q) {
                $q->where('progress', '>=', '50');
            })->count();

            $progress0To20 = User::where(['company_id' => authCompanyId(), 'status' => '1'])->whereHas('roles',function ($q) {
                $q->where('name','patient');
            })->whereHas('patientDetails',function ($q) {
                $q->where('progress', '>=', 0)->where('progress', '<=', 20);
            })->count();

            $progress0To20 = User::where(['company_id' => authCompanyId(), 'status' => '1'])->whereHas('roles',function ($q) {
                $q->where('name','patient');
            })->whereHas('patientDetails',function ($q) {
                $q->where('progress', '>=', 0)->where('progress', '<=', 20);
            })->count();

            $referralCounts = User::selectRaw('
                CASE
                    WHEN pd.progress >= 0 AND pd.progress <= 20 THEN "0 to 20 percent progress"
                    WHEN pd.progress > 20 AND pd.progress <= 40 THEN "21 to 40 percent progress"
                    WHEN pd.progress > 40 AND pd.progress <= 60 THEN "41 to 60 percent progress"
                    WHEN pd.progress > 60 AND pd.progress <= 80 THEN "61 to 80 percent progress"
                    WHEN pd.progress > 80 AND pd.progress <= 100 THEN "81 to 100 percent progress"
                END AS progress_range,
                COUNT(*) AS count
            ')
                ->join('patient_details as pd', 'users.id', '=', 'pd.user_id')
                ->where(['users.company_id' => authCompanyId(), 'users.status' => '1'])
                ->whereHas('roles', function ($q) {
                    $q->where('name', 'patient');
                })
                ->groupBy('progress_range')
                ->get();

            $toralReferral = User::where(['company_id' => authCompanyId(), 'status' => '1'])
                ->whereHas('roles',function ($q) {
                    $q->where('name','patient');
                })->count();

			return view('home', compact('progressGreaterThan50', 'toralReferral', 'referralCounts'));
        endif;
    }
}
