<div class="sidebar bg-dark text-white vh-100">
    <ul class="nav flex-column p-3">
        <li class="nav-item mb-2">
            <a href="{{ route('home') }}" class="nav-link {{ request()->routeIs('home') ? 'active' : '' }} text-white">
                Dashboard
            </a>
        </li>
        <li class="nav-item mb-2">
            <a href="{{ route('users.index') }}" class="nav-link {{ request()->routeIs('users.*') ? 'active' : '' }} text-white">
                Manage Users
            </a>
        </li>
        <li class="nav-item mb-2">
            <a href="{{ route('companies.index') }}" class="nav-link {{ request()->routeIs('companies.*') ? 'active' : '' }} text-white">
                Manage Companies
            </a>
        </li>
        <li class="nav-item mb-2">
            <a href="{{ route('roles.index') }}" class="nav-link {{ request()->routeIs('roles.*') ? 'active' : '' }} text-white">
                Manage Roles
            </a>
        </li>
        <li class="nav-item">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="btn btn-link nav-link text-white">Logout</button>
            </form>
        </li>
    </ul>
</div>
