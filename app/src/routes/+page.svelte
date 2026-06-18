<script lang="ts">
    let role = $state('')
    let section = $state(4)
    let owner = $state('no')
    let dept = $state('')

    type FileState = { file: File | null; url: string | null }

    let files = $state({
        id:         { file: null, url: null } as FileState,
        enrollment: { file: null, url: null } as FileState,
        letter:     { file: null, url: null } as FileState,
        or:         { file: null, url: null } as FileState,
        cr:         { file: null, url: null } as FileState,
        license:    { file: null, url: null } as FileState,
    })

    function setFile(key: keyof typeof files, file: File | null) {
        if (files[key].url) URL.revokeObjectURL(files[key].url!)
        files[key] = file
            ? { file, url: URL.createObjectURL(file) }
            : { file: null, url: null }
    }
</script>

{#snippet uploadLabel(label: string, key: keyof typeof files)}
    <label class="border p-2 flex flex-col gap-2 cursor-pointer hover:bg-gray-50">
        <span class="text-xs capitalize">{label}</span>

        {#if files[key].url}
            <img src={files[key].url} class="h-24 w-full object-cover rounded" alt={label} />
            <p class="text-xs truncate">{files[key].file?.name}</p>
        {:else}
            <div class="h-24 flex items-center justify-center text-gray-400 text-xs border border-dashed">
                Upload image
            </div>
        {/if}

        <input
            hidden
            type="file"
            accept="image/*"
            onchange={(e) => setFile(key, e.currentTarget.files?.[0] ?? null)}
        />
    </label>
{/snippet}

<div class="flex items-center justify-center bg-gray-100 py-10 min-h-screen">
    <div class="flex flex-col w-lg gap-2">

        <p class="m-auto mb-4 text-lg">
            Welcome, <span class="font-medium">joenino.cainday@liceo.edu.ph</span>
        </p>

        <!-- SECTION 1 -->
        {#if section === 1}
            <p class="m-auto mb-4 text-sm">Section 1: Personal Information</p>

            <div class="grid grid-cols-2 gap-2">
                <input class="w-full border p-2" type="text" placeholder="first name" />
                <input class="w-full border p-2" type="text" placeholder="last name" />
            </div>

            <input class="w-full border p-2" type="text" placeholder="vehicle make and model (e.g. Honda Civic 2022)" />
            <input class="w-full border p-2" type="text" placeholder="vehicle plate no." />

            <select
                bind:value={role}
                class:text-gray-500={!role}
            >
                <option value="" disabled hidden selected>role</option>
                <option class="text-black" value="student">student</option>
                <option class="text-black" value="employee">employee</option>
                <option class="text-black" value="visitor">visitor</option>
            </select>
            
            
            
            {#if ['student', 'employee'].includes(role)}
                <select 
                    bind:value={dept} 
                    class:text-gray-500={!dept}
                >
                    <option value="" disabled hidden selected>department</option>
                    <option class="text-black" value="visitor">visitor</option>
                </select>
                <input class="border p-2" type="text" placeholder="id no." />
            {/if}

        <!-- SECTION 2 -->
        {:else if section === 2}
            <p class="m-auto mb-4 text-sm">Section 2: Document Evaluation</p>

            <div class="flex border p-3 justify-between">
                <p>Is the vehicle registered under someone else's name?</p>
                <div class="flex gap-2 items-center">
                    <input type="radio" bind:group={owner} name="registered" value="yes" /> Yes
                    <input type="radio" bind:group={owner} name="registered" value="no" /> No
                </div>
            </div>

            <!-- Liceo documents (student / employee only) -->
            {#if role !== 'visitor'}
                <div class="grid gap-2" class:grid-cols-2={owner === 'no'} class:grid-cols-3={owner === 'yes'}>
                    {#if ['student', 'employee'].includes(role)}
                        {@render uploadLabel(`(Liceo) ${role} ID`, 'id')}
                    {/if}
                    {@render uploadLabel(`(Liceo) ${role === 'student' ? 'Enrollment' : 'Load Sheet / DTR'}`, 'enrollment')}
                    {#if owner === 'yes'}
                        {@render uploadLabel('Signed Letter / DOAS', 'letter')}
                    {/if}
                </div>
            {/if}

            <!-- Visitor + registered under someone else -->
            {#if role === 'visitor' && owner === 'yes'}
                <div class="grid grid-cols-2 gap-2">
                    {@render uploadLabel("(LTO) Driver's License", 'license')}
                    {@render uploadLabel('Signed Letter / DOAS', 'letter')}
                </div>
            {/if}

            <!-- LTO vehicle documents (always shown) -->
            <div class="grid gap-2" class:grid-cols-2={role === 'visitor' && owner === 'yes'} class:grid-cols-3={role !== 'visitor' || owner === 'no'}>
                {@render uploadLabel('(LTO) Vehicle OR', 'or')}
                {@render uploadLabel('(LTO) Vehicle CR', 'cr')}
                {#if role !== 'visitor' || owner === 'no'}
                    {@render uploadLabel("(LTO) Driver's License", 'license')}
                {/if}
            </div>

        {:else if section === 3}
            <p class="m-auto mb-4 text-sm">Section 4: Agreement to Park</p>

            <p>KNOWN ALL MEN BY THESE PRESENTS:</p>

            <p>That this agreement is signed by <u>name here</u>, in favor of Liceo de Cagayan University.</p>

            <p>WHEREAS, the President of Liceo de Cagayan has granted permission to allow the owner of the vehicle to park on the school premises.</p>
            
            <p>WHEREAS, the undersigned has agreed to the parking rules and regulations of Liceo de Cagayan University.</p>
            
            <p>Now, therefore, in view of the foregoing, the undersigned have agreed to the following rules and regulations.</p>

            <ol class="list-decimal pl-5 ">
                <li class="mt-2">
                    That the vehicle owner obligates himself to follow all the University parking
                    regulations as may be implemented from the time by Liceo de Cagayan University in
                    connection with this agreement to park;
                </li>

                <li class="mt-2">
                    That the vehicle owner shall place an authorized School Sticker on his/her vehicle
                    upon entering the University premises;
                </li>
        
                <li class="mt-2">
                    That the vehicle must be driven personally by the owner and authorized driver,
                </li>
                
                <li class="mt-2">
                    The official parking sticker be placed at the most prominent portion of the vehicle;
                </li>
                
                <li class="mt-2">
                    That the owner of the vehicles shall park only at designed bays;
                </li>
                
                <li class="mt-2">
                    That the school is not liable for whatever damage may happen to the vehicle while
                    inside the University premises;
                </li>
            
                <li class="mt-2">
                    That the undersigned is obligated to renew this agreement every semester;
                </li>
            </ol>

            <p>IN WITNESS HEREOF THE UNDERSIGNED HAS AFFIXED HIS/HER SIGNATURE THIS <u>day here</u> DAY OF <u>month here</u> <u>year here</u>.</p>    
            
            <div class="my-4">
                <input type="checkbox" /> I agree to the terms and conditions of this agreement.
            </div>

        {:else if section === 4}
            <p class="m-auto mb-4 text-sm">Section 4: University Vehicle Parking Regulations</p>
            
            <p>Liceo de Cagayan University provides vehicle parking privileges as part of the
            services offered to employees, students, and concessionaires. To ensure safety, these
            regulations have been produced and must be followed.</p>

            <ol class="list-decimal pl-5">
            
                <li class="mt-2">
                    Application for parking shall be transacted through the Office of Student
                    Affairs. Stickers may be availed only by the Employees, Students, and
                    Concessionaires of the University.
                </li>

                <li class="mt-2">
                    Requirements:
                    <ol class="list-[lower-alpha] pl-5">
                        <li class="mt-2">Agreement to Park form (original and photocopy)</li>
                        <li class="mt-2">School ID (photocopy)</li>
                        <li class="mt-2">Enrollment Form (students) or Load Sheet (Non-Regular Faculty) (photocopy)</li>
                        <li class="mt-2">Vehicle official receipt (OR) and certificate of registration (photocopy)</li>
                        <li class="mt-2">Driver's License (photocopy)</li>
                        <li class="mt-2">Authorization letter (If the vehicle is registered under a different name).</li>
                    </ol>
                </li>

                <li class="mt-2">
                    The Liceo U Official Parking Sticker fee shall be paid at the cashiers office only.
                    Only one (1) sticker is provided for every employee, student, and
                    concessionaire.
                </li>
                
                <li class="mt-2">
                    Stickers are color coded for security and monitoring purposes. Vehicles must
                    park only in designated areas to park.
                </li>
                
                <li class="mt-2">
                    Parking inside the University premises shall be on a first-come, first-served
                    basis. Members of the administration are given priority to use the parking
                    space adjacent to the Rodelsa Hall.
                </li>
                
                <li class="mt-2">
                    Parking permits may be revoked temporarily or permanently for the following:
                    <ol class="list-[lower-alpha] pl-5">
                        <li class="mt-2">parking in unauthorized areas;</li>
                        <li class="mt-2">using another person's sticker;</li>
                        <li class="mt-2">duplication or using fake stickers;</li>
                        <li class="mt-2">repeated failure to display permit;</li>
                        <li class="mt-2">violating traffic rules while inside the campus, and</li>
                        <li class="mt-2">having items in the vehicle that violate Liceo U policies on alcohol, prohibited drugs, and deadly weapons. (See Student Handbook or Personnel Manual)</li>
                    </ol>
                </li>
                
                <li class="mt-2">
                    The Director of the Office of Student Affairs, the Security and Safety Chief
                    Officer, and the guard on duty reserve the right to inspect all vehicles going in
                    and out of the university to ensure the safety and security of the Liceo de
                    Cagayan University community.
                </li>
                
                <li class="mt-2">
                    For concessionaires, delivery time is between 6:00 am to 12:00nn only.
                </li>

                <li class="mt-2">
                    For concerns, the Office of Student Affairs and the LICEO U Administration shall
                    be the venue to resolve the issue.
                </li>
                
            </ol>

            <div class="my-4">
                <input type="checkbox" /> I have read and fully understood the policies and regulations.
            </div>
        {/if}

        <!-- NAVIGATION -->
        <div class="grid gap-2" class:grid-cols-2={section > 1}>
            {#if section > 1}
                <button onclick={() => section--} class="border cursor-pointer p-4 hover:bg-gray-200">
                    Back
                </button>
            {/if}
            {#if section < 4}
                <button onclick={() => section++} class="border cursor-pointer p-4 hover:bg-gray-200">
                    Next
                </button>
            {:else}
                <button onclick={() => alert('Submitted successfully!')} class="border cursor-pointer p-4 hover:bg-gray-200">
                    Submit
                </button>
            {/if}
        </div>

        <p class="m-auto mt-4 text-xs">If you encounter any issues, contact <span class="underline" href="">osa@liceo.edu.ph</span></p>

    </div>
</div>